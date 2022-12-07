import { Module } from "@nestjs/common";
import { DbModule } from "../lib/db/db.module";
import { UserModule } from "../user/user.module";
import { MembershipController } from "./membership.controller";
import { MembershipService } from "./membership.service";

@Module({
  imports: [DbModule, UserModule],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule {}
