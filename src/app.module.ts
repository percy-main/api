import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { LogInterceptor } from "./lib/logging/log.interceptor";
import { LogModule } from "./lib/logging/log.module";
import { MembershipModule } from "./membership/membership.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [LogModule, AuthModule, UserModule, MembershipModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
})
export class AppModule {}
