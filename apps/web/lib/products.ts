const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string;
  stock: number;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  is_on_promotion: boolean;
  promotion_price: number | null;
}

// converte o formato do Prisma (camelCase, priceCents em centavos) pro
// formato snake_case/reais que o resto do front já espera — evita reescrever
// ProductGrid e as páginas que consomem Product
export function mapApiProduct(p: {
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
}): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.priceCents / 100,
    image_url: p.imageUrl,
    category_id: p.categoryId,
    stock: p.stock,
    is_featured: p.isFeatured,
    is_bestseller: p.isBestseller,
    is_new: p.isNew,
    is_on_promotion: p.isOnPromotion,
    promotion_price: p.promotionCents != null ? p.promotionCents / 100 : null,
  };
}

async function fetchProducts(params: Record<string, string>): Promise<Product[]> {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/api/products${query ? `?${query}` : ""}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Falha ao buscar produtos.");
  const data = await res.json();
  return (data.products ?? []).map(mapApiProduct);
}

export const categoryRepo = {
  async getAll(): Promise<Category[]> {
    const res = await fetch(`${API_URL}/api/products/categories`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Falha ao buscar categorias.");
    const data = await res.json();
    return (data.categories ?? []).map((c: { id: string; name: string; slug: string; count: number }) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      count: `${c.count} product${c.count === 1 ? "" : "s"}`,
    }));
  },

  async getBySlug(slug: string): Promise<Category | null> {
    const all = await this.getAll();
    return all.find((c) => c.slug === slug) ?? null;
  },
};

export const productRepo = {
  async getByCategory(categorySlug: string): Promise<Product[]> {
    return fetchProducts({ category: categorySlug });
  },

  async getFeatured(): Promise<Product[]> {
    return fetchProducts({ featured: "true" });
  },

  async getNew(): Promise<Product[]> {
    return fetchProducts({ isNew: "true" });
  },

  async getBestsellers(): Promise<Product[]> {
    return fetchProducts({ bestseller: "true" });
  },

  async getOnPromotion(): Promise<Product[]> {
    return fetchProducts({ promotion: "true" });
  },
};
