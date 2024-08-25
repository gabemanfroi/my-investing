import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/user.entity';
import { compare } from 'bcrypt';

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
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
