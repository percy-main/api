import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "../lib/config";
import { authConfig, AUTH_CONFIG } from "./auth.config";
import { AuthMiddleware } from "./auth.middleware";
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [],
  imports: [ConfigModule.forConfig(authConfig, AUTH_CONFIG)],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
