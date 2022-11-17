import { Controller, Get } from "@nestjs/common";
import { TAuthUser } from "../auth/auth.types";
import { AuthUser } from "../auth/authuser.decorator";
import { IHomeService } from "./home.service";

@Controller()
export class HomeController {
  constructor(private readonly homeService: IHomeService) {}

  @Get()
  public getHome(@AuthUser() user: TAuthUser) {
    return this.homeService.getHelloString(user);
  }
}
