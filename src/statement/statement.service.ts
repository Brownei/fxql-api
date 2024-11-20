import { ConflictException, HttpStatus, Injectable, Logger, NotAcceptableException } from '@nestjs/common';
import { CreateStatementDto } from './dto/create-statement.dto';
import { DbService } from 'src/utils/db.service';
import { convertToSpecificDataStructure } from 'src/lib';
import { Statement } from '@prisma/client';

@Injectable()
export class StatementService {
  constructor(private readonly dbService: DbService) { }

  async createStatement(createStatementDto: CreateStatementDto) {
    Logger.log("Creating Statement......")
    const statementsSet = new Set<Statement>()
    const regex = /([A-Z]{3}-[A-Z]{3}) \{\n\s*BUY ([1-9]\d{0,2}(\.\d+)?)\n\s*SELL ([1-9]\d{0,2}(\.\d+)?)\n\s*CAP (0|[1-9]\d*)\n\}/g;
    const statements = [];
    let statement: any;

    while ((statement = regex.exec(createStatementDto.FXQL)) !== null) {
      if (!statement[1] || !statement[2] || !statement[4] || !statement[6]) {
        Logger.log("Stopped creating abruptly.")
        throw new NotAcceptableException(
          {
            message: "Detailed error message",
            code: `FXQL-${HttpStatus.NOT_ACCEPTABLE}`,
            error: "Error with your format"
          }
        )
      }

      statements.push({
        sourceCurr: statement[1].split('-')[0], // Extracts the currency pair
        destinationCurr: statement[1].split('-')[1], // Extracts the currency pair
        buy: parseFloat(statement[2]),    // Extracts the BUY value
        sell: parseFloat(statement[4]),   // Extracts the SELL value
        cap: parseInt(statement[6], 10)   // Extracts the CAP value
      });

    }

    if (statements.length > 1000) {
      Logger.log("Stopped creating abruptly.")
      throw new ConflictException({
        message: "Detailed error message",
        code: `FXQL-${HttpStatus.CONFLICT}`,
        error: "You have exceeded the number amount of currencies per request (1000 currencies per request)"
      })
    }

    for (const particularStatement of statements) {
      const newStatement = await this.dbService.statement.create({
        data: {
          capAmount: particularStatement.cap,
          buyPrice: particularStatement.buy,
          sellPrice: particularStatement.sell,
          sourceCurrency: particularStatement.sourceCurr,
          destinationCurrency: particularStatement.destinationCurr
        }
      })


      statementsSet.add(newStatement)
    }

    const results = convertToSpecificDataStructure(Array.from(statementsSet))
    Logger.log("Statements Created.")
    return {
      message: results.length > 1 ? "FXQL Statement Parsed Successfully." : "Rates Parsed Successfully.",
      code: `FXQL-${HttpStatus.OK}`,
      data: results
    };
  }
}
