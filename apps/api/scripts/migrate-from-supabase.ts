/**
 * Migração one-off: Supabase (categories/products) -> Prisma (Category/Product).
 *
 * Roda uma vez só, na sua máquina — precisa de:
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  (service role, não a anon key —
 *   RLS pode bloquear leitura completa com a anon key)
 *   DATABASE_URL (já configurado pro Prisma)
 *
 * Uso:
 *   cd apps/api
 *   npx tsx scripts/migrate-from-supabase.ts
 */
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Ajuste esta lista se seus produtos já vendem pra mais/menos países —
// o schema antigo do Supabase não tinha campo de países por produto.
const DEFAULT_COUNTRIES = ["BR", "US"];

function skuFromSlug(slug: string): string {
  return `LN-${slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`;
}

async function migrateCategories() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;

  const slugToId = new Map<string, string>();

  for (const c of data ?? []) {
    const category = await prisma.category.upsert({
      where: { slug: c.slug },
      create: { name: c.name, slug: c.slug },
      update: { name: c.name },
    });
    slugToId.set(c.slug, category.id);
  }

  console.log(`Categorias migradas: ${slugToId.size}`);
  return slugToId;
}

async function migrateProducts(categoryIdBySlug: Map<string, string>) {
  const { data: categories } = await supabase.from("categories").select("id, slug");
  const supabaseCategoryIdToSlug = new Map<string, string>(
    (categories ?? []).map((c: { id: string; slug: string }) => [c.id, c.slug]),
  );

  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;

  let migrated = 0;
  for (const p of data ?? []) {
    const categorySlug = supabaseCategoryIdToSlug.get(p.category_id);
    const categoryId = categorySlug ? categoryIdBySlug.get(categorySlug) : undefined;
    if (!categoryId) {
      console.warn(`Produto "${p.name}" sem categoria válida — pulado. Confira manualmente depois.`);
      continue;
    }

    await prisma.product.upsert({
      where: { slug: p.slug },
      create: {
        sku: skuFromSlug(p.slug),
        slug: p.slug,
        name: p.name,
        description: p.description,
        imageUrl: p.image_url,
        priceCents: Math.round(Number(p.price) * 100),
        currency: "USD",
        stock: p.stock ?? 0,
        categoryId,
        countries: DEFAULT_COUNTRIES,
        isFeatured: !!p.is_featured,
        isBestseller: !!p.is_bestseller,
        isNew: !!p.is_new,
        isOnPromotion: !!p.is_on_promotion,
        promotionCents: p.promotion_price ? Math.round(Number(p.promotion_price) * 100) : null,
      },
      update: {
        name: p.name,
        description: p.description,
        imageUrl: p.image_url,
        priceCents: Math.round(Number(p.price) * 100),
        stock: p.stock ?? 0,
        categoryId,
        isFeatured: !!p.is_featured,
        isBestseller: !!p.is_bestseller,
        isNew: !!p.is_new,
        isOnPromotion: !!p.is_on_promotion,
        promotionCents: p.promotion_price ? Math.round(Number(p.promotion_price) * 100) : null,
      },
    });
    migrated++;
  }

  console.log(`Produtos migrados: ${migrated}`);
}

async function main() {
  const categoryIdBySlug = await migrateCategories();
  await migrateProducts(categoryIdBySlug);
  console.log("Migração concluída. Confira os dados antes de apagar as tabelas do Supabase.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
