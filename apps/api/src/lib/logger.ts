import pino from "pino";
import { env } from "../config/env";

export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  redact: {
    // nunca deixa esses campos irem pro log, mesmo por engano
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "*.password",
      "*.token",
      "*.accessToken",
      "*.refreshToken",
      "*.cardNumber",
      "*.cvv",
    ],
    censor: "[REDACTED]",
  },
});
