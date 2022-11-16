import { Controller, Get } from "@nestjs/common";
import { AuthUser } from "../auth/auth.types";
import { User } from "../auth/authuser.decorator";
import { IHomeService } from "./home.service";

@Controller()
export class HomeController {
  constructor(private readonly homeService: IHomeService) {}

  @Get()
  public getHome(@User() user: AuthUser) {
    return this.homeService.getHelloString(user);
  }
}
