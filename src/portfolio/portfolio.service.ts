import { Injectable } from '@nestjs/common';

@Injectable()
export class PortfolioService {
  getUserPortfolio(userId: number) {
    return Promise.resolve(userId);
  }
}
