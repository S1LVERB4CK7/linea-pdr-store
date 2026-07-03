import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { env } from "../config/env";
import { logger } from "../lib/logger";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(422).json({
      error: "Dados inválidos.",
      details: err.flatten().fieldErrors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // erro não previsto: loga completo internamente, responde genérico pro cliente.
  // Nunca devolver err.message/stack cru em produção — pode vazar detalhe de
  // implementação (query SQL, path interno, versão de lib) útil pra atacante.
  logger.error({ err, path: req.path }, "unhandled error");

  return res.status(500).json({
    error: "Erro interno do servidor.",
    ...(env.NODE_ENV !== "production" ? { debug: String(err) } : {}),
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `Rota não encontrada: ${req.method} ${req.path}` });
}
