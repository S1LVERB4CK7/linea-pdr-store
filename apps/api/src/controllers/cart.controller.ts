import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";
import { addCartItemSchema, updateCartItemSchema } from "../validators/cart.validators";

// inclui o produto junto — o front nunca deveria ter que fazer um segundo
// fetch só pra saber preço/nome/estoque atual do item do carrinho
const cartInclude = { product: true } as const;

export async function getCart(req: Request, res: Response) {
  const items = await prisma.cartItem.findMany({
    where: { userId: req.user!.sub },
    include: cartInclude,
    orderBy: { createdAt: "asc" },
  });
  return res.json({ items });
}

export async function addCartItem(req: Request, res: Response) {
  const data = addCartItemSchema.parse(req.body);

  const product = await prisma.product.findUnique({ where: { id: data.productId } });
  if (!product) throw new AppError(404, "Produto não encontrado.");
  if (product.stock < data.quantity) {
    throw new AppError(409, "Quantidade solicitada acima do estoque disponível.");
  }

  // upsert: se já existe o mesmo produto+tamanho no carrinho, soma a
  // quantidade em vez de criar linha duplicada
  const item = await prisma.cartItem.upsert({
    where: {
      userId_productId_size: {
        userId: req.user!.sub,
        productId: data.productId,
        size: data.size ?? "",
      },
    },
    create: {
      userId: req.user!.sub,
      productId: data.productId,
      size: data.size ?? "",
      quantity: data.quantity,
    },
    update: {
      quantity: { increment: data.quantity },
    },
    include: cartInclude,
  });

  return res.status(201).json({ item });
}

export async function updateCartItem(req: Request, res: Response) {
  const { itemId } = req.params;
  const data = updateCartItemSchema.parse(req.body);

  const existing = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!existing || existing.userId !== req.user!.sub) {
    throw new AppError(404, "Item de carrinho não encontrado.");
  }

  const item = await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity: data.quantity },
    include: cartInclude,
  });

  return res.json({ item });
}

export async function removeCartItem(req: Request, res: Response) {
  const { itemId } = req.params;

  const existing = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!existing || existing.userId !== req.user!.sub) {
    throw new AppError(404, "Item de carrinho não encontrado.");
  }

  await prisma.cartItem.delete({ where: { id: itemId } });
  return res.status(204).send();
}

export async function clearCart(req: Request, res: Response) {
  await prisma.cartItem.deleteMany({ where: { userId: req.user!.sub } });
  return res.status(204).send();
}
