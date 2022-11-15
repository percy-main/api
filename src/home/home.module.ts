import { Module } from "@nestjs/common";
import { ConfigModule } from "src/lib/config";
import { homeConfig } from "./home.config";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [ConfigModule.forConfig(homeConfig)],
})
export class HomeModule {}
