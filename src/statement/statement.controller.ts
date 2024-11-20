import { Controller, Post, Body } from '@nestjs/common';
import { StatementService } from './statement.service';
import { CreateStatementDto } from './dto/create-statement.dto';

@Controller('fxql-statements')
export class StatementController {
  constructor(private readonly statementService: StatementService) { }

  @Post()
  async createStatement(@Body() dto: CreateStatementDto) {
    return await this.statementService.createStatement(dto);
  }
}
