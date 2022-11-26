import { ApiProperty } from "@nestjs/swagger";

export class Error400Dto {
  @ApiProperty({ example: 400 })
  statusCode!: number;

  @ApiProperty({
    example: ["name must not be empty", "dob must be a valid date"],
  })
  message!: string[];

  @ApiProperty({ example: "Bad request" })
  error!: string;
}
