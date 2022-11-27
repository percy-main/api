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
import { AuthService } from "../auth/auth.service";
import { Session, TSession } from "../auth/session.decorator";
import { Error400Dto } from "../lib/dto/error400.dto";
import { CreateUserDTO, UserDTO } from "./dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

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
  public async getMe(@Session() authUser: TSession): Promise<UserDTO> {
    const user = await this.userService.getUserByIdentityId(authUser);

    if (!user) {
      throw new NotFoundException("No DB user found for the current user");
    }

    const { email, emailIsVerified } = await this.authService.getUserEmail(
      authUser,
    );

    return UserDTO.create({ ...user, emailIsVerified, email });
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
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserDTO> {
    const user = await this.userService.createUser(authUser, createUserDTO);

    if (!user) {
      throw new InternalServerErrorException("Could not create the user");
    }

    const { email, emailIsVerified } = await this.authService.getUserEmail(
      authUser,
    );

    return UserDTO.create({ ...user, emailIsVerified, email });
  }
}
