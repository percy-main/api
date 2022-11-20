import { Controller, Get } from "@nestjs/common";
import { Session, TSession } from "../auth/session.decorator";
import { IHomeService } from "./home.service";

@Controller()
export class HomeController {
  constructor(private readonly homeService: IHomeService) {}

  @Get()
  public getHome(@Session() user: TSession) {
    return this.homeService.getHelloString(user);
  }
}
