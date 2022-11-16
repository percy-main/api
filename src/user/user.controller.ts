import { Controller, Get, NotFoundException } from "@nestjs/common";
import { AuthUser } from "../auth/auth.types";
import { User } from "../auth/authuser.decorator";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/me")
  public async getMe(@User() authUser: AuthUser) {
    const user = await this.userService.getUserByIdentityId(authUser);

    if (!user) {
      throw new NotFoundException("No DB user found for this auth user.");
    }

    return user;
  }
}
