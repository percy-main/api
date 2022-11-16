import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "../lib/config";
import { authConfig, AUTH_CONFIG } from "./auth.config";
import { AuthGuard } from "./auth.guard";
import { JwksService } from "./jwks.service";

@Module({
  imports: [ConfigModule.forConfig(authConfig, AUTH_CONFIG)],
  providers: [JwksService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
