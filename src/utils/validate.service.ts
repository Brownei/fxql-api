import { Injectable } from "@nestjs/common";
import { validateOrReject } from "class-validator";
import { CreateStatementDto } from "src/statement/dto/create-statement.dto";

@Injectable()
export class ValidateService {
  async validateFxql(fxqlDto: CreateStatementDto): Promise<{ message: string, errors?: any }> {
    try {
      await validateOrReject(fxqlDto);
      return { message: 'FXQL is valid' };
    } catch (errors) {
      return { message: 'Validation failed', errors };
    }
  }
}
