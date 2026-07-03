import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().length(3),
  stock: z.number().int().nonnegative(),
  category: z.string(),
  countries: z.array(z.string().length(2)),
});

export type Product = z.infer<typeof productSchema>;

export const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive().max(50), // limite sensato, evita abuso
});
