import { NextFunction, Request, RequestHandler, Response } from "express";

// evita ter que try/catch em todo controller async — qualquer rejeição
// de promise cai automaticamente no errorHandler central
export function asyncHandler(fn: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
