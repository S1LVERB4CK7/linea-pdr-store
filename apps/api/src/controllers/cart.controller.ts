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

  // productId aqui é qualquer identificador que o front já usa (sku, slug ou
  // o id real do Prisma) — resolve pro produto de verdade antes de gravar
  const product = await prisma.product.findFirst({
    where: { OR: [{ id: data.productId }, { sku: data.productId }, { slug: data.productId }] },
  });
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
        productId: product.id,
        size: data.size ?? "",
      },
    },
    create: {
      userId: req.user!.sub,
      productId: product.id,
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

async function resolveCartItem(userId: string, productIdentifier: string, size: string) {
  const product = await prisma.product.findFirst({
    where: { OR: [{ id: productIdentifier }, { sku: productIdentifier }, { slug: productIdentifier }] },
  });
  if (!product) throw new AppError(404, "Produto não encontrado.");

  const cartItem = await prisma.cartItem.findUnique({
    where: { userId_productId_size: { userId, productId: product.id, size } },
  });
  if (!cartItem) throw new AppError(404, "Item de carrinho não encontrado.");

  return cartItem;
}

export async function updateCartItem(req: Request, res: Response) {
  const { productId } = req.params;
  if (!productId) throw new AppError(400, "Produto não informado.");
  const size = typeof req.query.size === "string" ? req.query.size : "";
  const data = updateCartItemSchema.parse(req.body);

  const existing = await resolveCartItem(req.user!.sub, productId, size);

  const item = await prisma.cartItem.update({
    where: { id: existing.id },
    data: { quantity: data.quantity },
    include: cartInclude,
  });

  return res.json({ item });
}

export async function removeCartItem(req: Request, res: Response) {
  const { productId } = req.params;
  if (!productId) throw new AppError(400, "Produto não informado.");
  const size = typeof req.query.size === "string" ? req.query.size : "";

  const existing = await resolveCartItem(req.user!.sub, productId, size);

  await prisma.cartItem.delete({ where: { id: existing.id } });
  return res.status(204).send();
}

export async function clearCart(req: Request, res: Response) {
  await prisma.cartItem.deleteMany({ where: { userId: req.user!.sub } });
  return res.status(204).send();
}
