import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  private readonly logger = new Logger('ErrorMiddleware');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        this.logger.error(`[${req.method}] ${req.url} - ${res.statusCode}`, {
          headers: req.headers,
          query: req.query,
          body: req.body,
        });
      }
    });
    next();
  }
}