import { LoginDto } from 'src/domain/dto/auth/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CommonAuthService } from 'src/infra/core/common-auth/common-auth.service';
import { UnauthorizedException } from '@nestjs/common';

export const ILoginUseCaseToken = Symbol('ILoginUseCase');

export interface ILoginUseCase {
  execute(dto: LoginDto): Promise<{ accessToken: string }>;
}

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly commonAuthService: CommonAuthService,
  ) {}

  async execute(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.commonAuthService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      email: user.email,
      sub: user.id,
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      portfolioId: user.portfolio.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
