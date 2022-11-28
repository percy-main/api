import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from "@nestjs/common";
import { ApiForbiddenResponse, ApiHeader, ApiResponse } from "@nestjs/swagger";
import { Session, TSession } from "../auth/session.decorator";
import { Error400Dto } from "../lib/dto/error400.dto";
import { CreateMembershipDTO, MembershipDTO } from "./dto";
import { MembershipService } from "./membership.service";

@Controller("membership")
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: "The result of creating the user",
    type: () => MembershipDTO,
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
    @Session() session: TSession,
    @Body() createMembershipDTO: CreateMembershipDTO,
  ): Promise<MembershipDTO> {
    console.log({ session, createMembershipDTO });
    const membership = await this.membershipService.createMembership(
      createMembershipDTO,
      session,
    );

    if (!membership) {
      throw new InternalServerErrorException("Could not create the membership");
    }

    return MembershipDTO.create(membership);
  }
}
