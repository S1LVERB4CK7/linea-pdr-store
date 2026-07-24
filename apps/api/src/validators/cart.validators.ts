import { z } from "zod";

export const addCartItemSchema = z.object({
  productId: z.string().min(1),
  size: z.string().trim().max(40).optional(),
  quantity: z.number().int().min(1).max(99).default(1),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1).max(99),
});

export const wishlistItemSchema = z.object({
  productId: z.string().min(1),
});
