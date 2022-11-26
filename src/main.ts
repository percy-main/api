import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import supertokens from "supertokens-node";
import { appConfig } from "./app.config";
import { AppModule } from "./app.module";
import { SupertokensExceptionFilter } from "./auth/auth.filter";
import { AuthGuard } from "./auth/auth.guard";
import { BaseLogger } from "./lib/logging/logger.base";
import { NestLoggerAdapter } from "./lib/logging/logger.nestadapter";
import { setupOpenApi } from "./openapi";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new NestLoggerAdapter(BaseLogger.getLogger()),
  });

  app.enableShutdownHooks();
  app.enableCors({
    origin: appConfig.corsAllowedDomains,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new AuthGuard());

  setupOpenApi(app);

  await app.listen(appConfig.port);
}
bootstrap();
