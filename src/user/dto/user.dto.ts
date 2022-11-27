import { ApiProperty } from "@nestjs/swagger";
import dayjs from "dayjs";
import * as uuid from "uuid";
import { DbUserDTO } from "./dbUser.dto";

export type UserAuthProperties = {
  email: string;
  emailIsVerified: boolean;
};

export class UserDTO {
  private constructor(user: UserDTO) {
    Object.assign(this, user);
  }

  static create(user: DbUserDTO & UserAuthProperties) {
    return new UserDTO({
      id: user.id,
      identityId: user.identity_id,
      name: user.name,
      dob: dayjs(user.dob).format("YYYY-MM-DD"),
      email: user.email,
      emailIsVerified: user.emailIsVerified,
    });
  }

  @ApiProperty({ description: "ID", example: uuid.v4() })
  id!: string;

  @ApiProperty({ description: "Identity ID", example: "connection|12345" })
  identityId!: string;

  @ApiProperty({ description: "Name", example: "John Smith" })
  name!: string;

  @ApiProperty({ description: "Date Of Birth", example: "2002-11-26" })
  dob!: string;

  @ApiProperty({ description: "Email address", example: "test@example.com" })
  email!: string;

  @ApiProperty({
    description: "Has email address been verified",
    example: true,
  })
  emailIsVerified!: boolean;
}
