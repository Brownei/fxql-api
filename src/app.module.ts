import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilsModule } from './utils/utils.module';
import { StatementModule } from './statement/statement.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { FxqlValidator } from './validator/statement.validator';

@Module({
  imports: [
    UtilsModule,
    StatementModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 3,
    }]),],
  controllers: [AppController],
  providers: [
    AppService,
    FxqlValidator,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
