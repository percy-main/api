import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { appConfig } from "./app.config";
import { AppModule } from "./app.module";
import { BaseLogger } from "./lib/logging/logger.base";
import { NestLoggerAdapter } from "./lib/logging/logger.nestadapter";
import { setupOpenApi } from "./openapi";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new NestLoggerAdapter(BaseLogger.getLogger()),
  });

  app.enableShutdownHooks();
  app.enableCors();

  setupOpenApi(app);

  await app.listen(appConfig.port);
}
bootstrap();
