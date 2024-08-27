import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from 'src/domain/dto/users/sign-up.dto';
import { hash } from 'bcrypt';
import { USER_REPOSITORY } from 'src/infra/providers/users.providers';
import { User } from 'src/domain/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

export interface ISignUpUseCase {
  execute(dto: SignUpDto): Promise<{ accessToken: string }>;
}

@Injectable()
export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(dto: SignUpDto): Promise<{ accessToken: string }> {
    const userExists = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await hash(dto.password, 10);
    const user = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const payload = {
      email: user.email,
      sub: user.id,
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    this.eventEmitter.emit('user.created', user);

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
