import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CurrencyAmountDto {
  constructor(amount: number) {
    this.amount = amount;
    this.currency = "gbp";
  }

  @ApiProperty({
    description: "Currency code",
    example: "gbp",
  })
  currency!: string;

  @ApiProperty({
    description: "Amount in smallest currency unit",
    example: 10000,
  })
  @IsNumber()
  @IsPositive()
  amount!: number;
}
