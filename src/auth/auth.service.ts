import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const hashedPassword = await hash(registerDto.password, 10);
    const user = await this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
