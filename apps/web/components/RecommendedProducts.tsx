import { ProductGrid } from "./ProductGrid";
import { mapApiProduct, type Product } from "@/lib/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  categoryId: string;
  stock: number;
  isFeatured: boolean;
  isBestseller: boolean;
  isNew: boolean;
  isOnPromotion: boolean;
  promotionCents: number | null;
}

async function getRecommendations(productIdentifier: string, limit = 8): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/products/${encodeURIComponent(productIdentifier)}/recommendations?limit=${limit}`,
      { next: { revalidate: 120 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    const boughtTogether: ApiProduct[] = data.boughtTogether ?? [];
    const related: ApiProduct[] = data.related ?? [];
    return [...boughtTogether, ...related].map(mapApiProduct);
  } catch {
    return [];
  }
}

// productIdentifier: sku, slug ou id do produto usado como base pra
// recomendar (ex: o produto em destaque da vitrine, ou o produto da PDP)
export async function RecommendedProducts({
  productIdentifier,
  title = "Recommended for you",
}: {
  productIdentifier: string;
  title?: string;
}) {
  const products = await getRecommendations(productIdentifier);

  // sem recomendações ainda (produto sem histórico de pedidos e sem base
  // migrada) — não mostra a seção em vez de exibir um bloco vazio
  if (products.length === 0) return null;

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-[70px]">
      <h2 className="text-[26px] font-display font-semibold mb-8">{title}</h2>
      <ProductGrid products={products} />
    </section>
  );
}
