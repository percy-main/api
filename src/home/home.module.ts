import { Module } from "@nestjs/common";
import { ConfigModule } from "../lib/config";
import { homeConfig } from "./home.config";
import { HomeController } from "./home.controller";
import { HomeService, IHomeService } from "./home.service";

@Module({
  controllers: [HomeController],
  providers: [{ provide: IHomeService, useClass: HomeService }],
  imports: [ConfigModule.forConfig(homeConfig)],
})
export class HomeModule {}
