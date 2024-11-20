import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { FxqlValidator } from "src/validator/statement.validator";

export class CreateStatementDto {
  @ApiProperty({
    required: true,
    type: String,
    nullable: false,
    examples: ["USD-GBP {\\n BUY 100\\n SELL 200\\n CAP 93800\\n}", "USD-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n  CAP 10000\\n}\\n\\nEUR-JPY {\\n  BUY 145.20\\n  SELL 146.50\\n  CAP 50000\\n}\\n\\nNGN-USD {\\n  BUY 0.0022\\n  SELL 0.0023\\n  CAP 2000000\\n}"]
  })
  @IsString()
  @IsNotEmpty()
  @Validate(FxqlValidator)
  FXQL: string;
}
