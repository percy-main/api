import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import dayjs, { Dayjs } from "dayjs";
import { IsOverXYearsAgo, IsValidDayJs } from "../../lib/validation";

export class CreateUserDTO {
  @ApiProperty({ description: "Name", example: "John Smith" })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Date Of Birth",
    example: "2002-11-26",
    type: "string",
  })
  @Transform(({ value }) => dayjs(value))
  @IsValidDayJs()
  @IsOverXYearsAgo(13)
  dob!: Dayjs;
}
