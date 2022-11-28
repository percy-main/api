import { BadRequestException, Injectable } from "@nestjs/common";
import { first } from "lodash";
import { Client } from "pg";
import { TSession } from "../auth/session.decorator";
import { LogService } from "../lib/logging/log.service";
import { UserService } from "../user/user.service";
import { CreateMembershipDTO, DbMembershipDTO } from "./dto";
import {
  createMembership,
  ICreateMembershipResult,
} from "./queries/createMembership.queries";

@Injectable()
export class MembershipService {
  constructor(
    private readonly dbClient: Client,
    private readonly userService: UserService,
    private readonly logger: LogService,
  ) {}

  public async createMembership(
    membership: CreateMembershipDTO,
    session: TSession,
  ) {
    const user = await this.userService.getUserByIdentityId(session);

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const dbMembership = await createMembership.run(
      {
        name: membership.name,
        price_annual: membership.priceAnnual.amount,
        price_monthly: membership.priceMonthly.amount,
        invalid_from: membership.invalid_from?.toDate(),
        created_by: user.id,
      },
      this.dbClient,
    );

    return this.dbMembershipToDTO(dbMembership);
  }

  private dbMembershipToDTO(result: ICreateMembershipResult[]) {
    const dbMembership = first(result);

    if (!dbMembership) {
      this.logger.info("No membership found");
      return;
    }

    return DbMembershipDTO.create(dbMembership);
  }
}
