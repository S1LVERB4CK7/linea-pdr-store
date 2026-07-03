import cors from "cors";
import { corsAllowedOrigins } from "../config/env";

export const corsMiddleware = cors({
  origin(origin, callback) {
    // requests sem origin (ex: curl, mobile app nativo, healthcheck) passam
    if (!origin) return callback(null, true);

    if (corsAllowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origem não autorizada pelo CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
});
