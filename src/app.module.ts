import { Module } from "@nestjs/common";
import { LogModule } from "./lib/logging/log.module";
import { HomeModule } from "./home/home.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LogInterceptor } from "./lib/logging/log.interceptor";

@Module({
  imports: [LogModule, HomeModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
})
export class AppModule {}
