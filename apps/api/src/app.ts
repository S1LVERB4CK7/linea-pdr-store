import express from "express";
import compression from "compression";
import pinoHttp from "pino-http";

import { corsMiddleware } from "./middleware/cors";
import { securityHeaders, preventParamPollution } from "./middleware/security";
import { globalRateLimiter } from "./middleware/rateLimit";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { logger } from "./lib/logger";

import authRoutes from "./routes/auth.routes";

export const app = express();

// atrás de proxy (Render/Vercel) — necessário pra rate-limit e IP
// funcionarem corretamente com X-Forwarded-For
app.set("trust proxy", 1);

app.use(securityHeaders);
app.use(corsMiddleware);
app.use(compression());
app.use(preventParamPollution);
app.use(express.json({ limit: "1mb" })); // limite de payload evita abuso
app.use(pinoHttp({ logger }));
app.use(globalRateLimiter);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
// próximas rotas: /api/products, /api/orders, /api/leads (Revenue Leak Engine), etc.

app.use(notFoundHandler);
app.use(errorHandler);
