import { Global, Module } from "@nestjs/common";
import { LogService } from "./log.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
