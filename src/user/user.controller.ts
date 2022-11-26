import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiResponse,
} from "@nestjs/swagger";
import { Session, TSession } from "../auth/session.decorator";
import { Error400Dto } from "../lib/dto/error400.dto";
import { CreateUserDTO, UserDTO } from "./dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/me")
  @ApiResponse({
    status: 200,
    description: "The currently logged in user",
    type: () => UserDTO,
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

    return UserDTO.fromDbUser(user);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: "The result of creating the user",
    type: () => UserDTO,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request",
    type: () => Error400Dto,
  })
  @ApiForbiddenResponse({
    description: "Inadequate authorization",
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer authorization",
    example: "Bearer ey12345=",
  })
  public async createUser(
    @Session() authUser: TSession,
    @Body() userDTO: CreateUserDTO,
  ) {
    const user = await this.userService.createUser(authUser, userDTO);

    if (!user) {
      throw new InternalServerErrorException("Could not create the user");
    }

    return UserDTO.fromDbUser(user);
  }
}
