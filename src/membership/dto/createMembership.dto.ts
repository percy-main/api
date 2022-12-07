import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import dayjs, { Dayjs } from "dayjs";
import { CurrencyAmountDto } from "../../currency/currency-amount.dto";
import { IsValidDayJs } from "../../lib/validation";

export class CreateMembershipDTO {
  @ApiProperty({ description: "Name", example: "Playing Membership" })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Invalid from",
    example: "2022-11-28T22:57:53.446Z",
    type: "string",
  })
  @Transform(({ value }) => dayjs(value))
  @IsValidDayJs()
  @IsOptional()
  invalid_from!: Dayjs | undefined;

  @ApiProperty({
    description: "Monthly price in smallest currency unit",
    example: { currency: "gbp", amount: 100 },
  })
  @ValidateNested()
  priceMonthly!: CurrencyAmountDto;

  @ApiProperty({
    description: "Annual price in smallest currency unit",
    example: { currency: "gbp", amount: 100 },
  })
  @ValidateNested()
  priceAnnual!: CurrencyAmountDto;
}
