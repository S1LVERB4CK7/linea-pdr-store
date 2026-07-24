import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";
import { wishlistItemSchema } from "../validators/cart.validators";

export async function getWishlist(req: Request, res: Response) {
  const items = await prisma.wishlistItem.findMany({
    where: { userId: req.user!.sub },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
  return res.json({ items });
}

export async function addWishlistItem(req: Request, res: Response) {
  const data = wishlistItemSchema.parse(req.body);

  const product = await prisma.product.findUnique({ where: { id: data.productId } });
  if (!product) throw new AppError(404, "Produto não encontrado.");

  // idempotente: favoritar 2x o mesmo produto não gera erro nem duplicata
  const item = await prisma.wishlistItem.upsert({
    where: { userId_productId: { userId: req.user!.sub, productId: data.productId } },
    create: { userId: req.user!.sub, productId: data.productId },
    update: {},
    include: { product: true },
  });

  return res.status(201).json({ item });
}

export async function removeWishlistItem(req: Request, res: Response) {
  const { productId } = req.params;

  await prisma.wishlistItem.deleteMany({
    where: { userId: req.user!.sub, productId },
  });

  return res.status(204).send();
}
