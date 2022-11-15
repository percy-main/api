import { Module } from "@nestjs/common";
import { LogModule } from "./lib/logging/log.module";

@Module({
  imports: [LogModule],
})
export class AppModule {}
