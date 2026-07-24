import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";

export async function listCategories(_req: Request, res: Response) {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return res.json({
    categories: categories.map((c: (typeof categories)[number]) => ({ id: c.id, name: c.name, slug: c.slug, count: c._count.products })),
  });
}

export async function listProducts(req: Request, res: Response) {
  const { category, country, featured, bestseller, isNew, promotion } = req.query;

  const products = await prisma.product.findMany({
    where: {
      ...(typeof category === "string" ? { category: { slug: category } } : {}),
      ...(typeof country === "string" ? { countries: { has: country } } : {}),
      ...(featured === "true" ? { isFeatured: true } : {}),
      ...(bestseller === "true" ? { isBestseller: true } : {}),
      ...(isNew === "true" ? { isNew: true } : {}),
      ...(promotion === "true" ? { isOnPromotion: true } : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return res.json({ products });
}

export async function getProduct(req: Request, res: Response) {
  const { id } = req.params;

  const product = await prisma.product.findFirst({
    where: { OR: [{ id }, { sku: id }, { slug: id }] },
    include: { category: true },
  });
  if (!product) throw new AppError(404, "Produto não encontrado.");

  return res.json({ product });
}

// Recomendações em duas camadas:
// 1) "quem comprou isso também comprou" — via co-ocorrência real em pedidos
// 2) fallback/complemento: mesma categoria, pra nunca devolver lista vazia
// (produto novo sem histórico de vendas ainda se beneficia da vitrine)
export async function getRecommendations(req: Request, res: Response) {
  const { id } = req.params;
  const limit = Math.min(Number(req.query.limit) || 8, 20);

  const product = await prisma.product.findFirst({ where: { OR: [{ id }, { sku: id }, { slug: id }] } });
  if (!product) throw new AppError(404, "Produto não encontrado.");

  const coOccurrences = await prisma.orderItem.findMany({
    where: {
      productId: { not: product.id },
      order: { items: { some: { productId: product.id } } },
    },
    select: { productId: true },
  });

  const frequency = new Map<string, number>();
  for (const { productId } of coOccurrences) {
    frequency.set(productId, (frequency.get(productId) ?? 0) + 1);
  }
  const boughtTogetherIds = [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([productId]) => productId);

  const boughtTogether = boughtTogetherIds.length
    ? await prisma.product.findMany({ where: { id: { in: boughtTogetherIds } }, include: { category: true } })
    : [];

  const remaining = limit - boughtTogether.length;
  const related =
    remaining > 0
      ? await prisma.product.findMany({
          where: {
            categoryId: product.categoryId,
            id: { notIn: [product.id, ...boughtTogetherIds] },
          },
          take: remaining,
          orderBy: { createdAt: "desc" },
          include: { category: true },
        })
      : [];

  return res.json({ boughtTogether, related });
}
