import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DbModule } from "../lib/db/db.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [DbModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
