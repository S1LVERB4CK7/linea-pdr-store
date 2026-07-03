import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { hashPassword, verifyPassword } from "../lib/password";
import { signAccessToken, signRefreshToken } from "../lib/tokens";
import { loginSchema, registerSchema } from "../validators/auth.validators";
import { AppError } from "../middleware/errorHandler";

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    // mensagem genérica de propósito — não confirma pro atacante que o
    // e-mail existe na base (evita enumeração de contas)
    throw new AppError(409, "Não foi possível concluir o cadastro com esses dados.");
  }

  const passwordHash = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      country: data.country,
      role: "customer",
    },
    select: { id: true, name: true, email: true, role: true },
  });

  const accessToken = signAccessToken({ sub: user.id, role: user.role as "customer" });
  const refreshToken = signRefreshToken({ sub: user.id, role: user.role as "customer" });

  return res.status(201).json({ user, accessToken, refreshToken });
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email: data.email } });

  // mesma mensagem de erro pra "usuário não existe" e "senha errada" —
  // não dar pista de qual das duas falhou
  const invalidCredentials = () => new AppError(401, "E-mail ou senha inválidos.");

  if (!user) throw invalidCredentials();

  const passwordOk = await verifyPassword(data.password, user.passwordHash);
  if (!passwordOk) throw invalidCredentials();

  const accessToken = signAccessToken({ sub: user.id, role: user.role as "customer" });
  const refreshToken = signRefreshToken({ sub: user.id, role: user.role as "customer" });

  return res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  });
}
