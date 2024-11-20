import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, Validate } from "class-validator";
import { FxqlValidator } from "src/validator/statement.validator";

export class CreateStatementDto {
  @ApiProperty({
    required: true,
    type: String,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @Validate(FxqlValidator)
  FXQL: string;
}
