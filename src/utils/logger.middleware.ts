import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const ip = req.ip;

    // Log the incoming request details
    res.on('finish', () => {
      const { statusCode } = res;
      switch (statusCode) {
        case 201:
          Logger.log(`[Middleware] StatementController {${url}, ${method}} ${statusCode}`);
        case 200:
          Logger.log(`[Middleware] StatementController {${url}, ${method}} ${statusCode}`);
        case 409:
          Logger.error(`[Middleware] StatementController {${url}, ${method}} ${statusCode}`);
        case 406:
          Logger.error(`[Middleware] StatementController {${url}, ${method}} ${statusCode}`);
      }
    });

    next();
  }
}

