import { Router } from "express";
import { authRateLimiter } from "../middleware/rateLimit";
import { login, register } from "../controllers/auth.controller";
import { asyncHandler } from "../lib/asyncHandler";

const router = Router();

// authRateLimiter aqui é crítico: essas duas rotas são o alvo #1
// de brute-force e credential stuffing num site global
router.post("/register", authRateLimiter, asyncHandler(register));
router.post("/login", authRateLimiter, asyncHandler(login));

export default router;
