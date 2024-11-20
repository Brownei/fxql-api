import { Controller, Post, Body } from '@nestjs/common';
import { StatementService } from './statement.service';
import { CreateStatementDto } from './dto/create-statement.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Statement")
@ApiResponse({
  status: "2XX",
  description: "FXQL Statement Parsed Successfully."
})
@ApiResponse({
  status: "4XX",
  description: "Detailed error message"
})
@Controller('fxql-statements')
export class StatementController {
  constructor(private readonly statementService: StatementService) { }

  @Post()
  async createStatement(@Body() dto: CreateStatementDto) {
    return await this.statementService.createStatement(dto);
  }
}
