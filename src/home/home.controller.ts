import { Controller, Get } from "@nestjs/common";
import { IHomeService } from "./home.service";

@Controller()
export class HomeController {
  constructor(private readonly homeService: IHomeService) {}

  @Get()
  public getHome() {
    return this.homeService.getHelloString();
  }
}
