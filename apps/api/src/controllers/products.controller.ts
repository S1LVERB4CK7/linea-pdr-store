import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";

export async function listProducts(req: Request, res: Response) {
  const { category, country } = req.query;

  const products = await prisma.product.findMany({
    where: {
      ...(typeof category === "string" ? { category } : {}),
      ...(typeof country === "string" ? { countries: { has: country } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return res.json({ products });
}

export async function getProduct(req: Request, res: Response) {
  const { id } = req.params;

  const product = await prisma.product.findFirst({
    where: { OR: [{ id }, { sku: id }] },
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

  const product = await prisma.product.findFirst({ where: { OR: [{ id }, { sku: id }] } });
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
    ? await prisma.product.findMany({ where: { id: { in: boughtTogetherIds } } })
    : [];

  const remaining = limit - boughtTogether.length;
  const related =
    remaining > 0
      ? await prisma.product.findMany({
          where: {
            category: product.category,
            id: { notIn: [product.id, ...boughtTogetherIds] },
          },
          take: remaining,
          orderBy: { createdAt: "desc" },
        })
      : [];

  return res.json({ boughtTogether, related });
}
