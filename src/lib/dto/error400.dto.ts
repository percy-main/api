import { ApiProperty } from "@nestjs/swagger";

export class Error400Dto {
  @ApiProperty({ example: 400 })
  statusCode!: number;

  @ApiProperty({
    example: ["descriptive error messages"],
  })
  message!: string[];

  @ApiProperty({ example: "Bad request" })
  error!: string;
}
