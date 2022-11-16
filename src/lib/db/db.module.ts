import { Module } from "@nestjs/common";
import { ConfigModule } from "../config";
import { dbConfig, DB_CONFIG } from "./db.config";
import { dbClientProvider } from "./db.provider";

@Module({
  imports: [ConfigModule.forConfig(dbConfig, DB_CONFIG)],
  providers: [dbClientProvider],
  exports: [dbClientProvider],
})
export class DbModule {}
