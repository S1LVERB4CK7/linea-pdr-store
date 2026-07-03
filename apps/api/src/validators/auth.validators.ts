import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email(),
  // política mínima: 10+ chars, ao menos 1 número — ajuste conforme necessidade
  password: z
    .string()
    .min(10, "senha precisa de pelo menos 10 caracteres")
    .regex(/[0-9]/, "senha precisa conter ao menos um número"),
  country: z.string().length(2, "use o código ISO do país, ex: BR, US"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});
