import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ValidateService } from './validate.service';

@Global()
@Module({
  providers: [DbService, ValidateService],
  exports: [DbService, ValidateService]
})
export class UtilsModule { }

