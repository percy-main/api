import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { HomeModule } from "./home/home.module";
import { LogInterceptor } from "./lib/logging/log.interceptor";
import { LogModule } from "./lib/logging/log.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [LogModule, HomeModule, AuthModule, UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
})
export class AppModule {}
