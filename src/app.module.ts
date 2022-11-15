import { Module } from "@nestjs/common";
import { LogModule } from "./lib/logging/log.module";
import { HomeModule } from './home/home.module';

@Module({
  imports: [LogModule, HomeModule],
})
export class AppModule {}
