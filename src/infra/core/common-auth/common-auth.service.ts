import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entity/user.entity';
import { compare } from 'bcrypt';
import { Portfolio } from 'src/domain/entity/portfolio.entity';

@Injectable()
export class CommonAuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
  ) {}

  async validateUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: [Portfolio],
    });
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
