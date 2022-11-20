import { Controller, Get, NotFoundException } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiResponse,
} from "@nestjs/swagger";
import { Session, TSession } from "../auth/session.decorator";
import { User } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/me")
  @ApiResponse({
    status: 200,
    description: "The currently logged in user",
    type: User,
  })
  @ApiNotFoundResponse({
    description: "No DB user found for the current user",
  })
  @ApiForbiddenResponse({
    description: "Inadequate authorization",
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer authorization",
    example: "Bearer ey12345=",
  })
  public async getMe(@Session() authUser: TSession) {
    const user = await this.userService.getUserByIdentityId(authUser);

    if (!user) {
      throw new NotFoundException("No DB user found for the current user");
    }

    return User.fromDbUser(user);
  }
}
