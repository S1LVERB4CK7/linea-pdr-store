import "dotenv/config";
import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";

app.listen(env.PORT, () => {
  logger.info(`🚀 API rodando na porta ${env.PORT} [${env.NODE_ENV}]`);
});
