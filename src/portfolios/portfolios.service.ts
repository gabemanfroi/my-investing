import { Injectable } from '@nestjs/common';

@Injectable()
export class PortfoliosService {
  getUserPortfolio(userId: number) {
    return Promise.resolve(userId);
  }
}
