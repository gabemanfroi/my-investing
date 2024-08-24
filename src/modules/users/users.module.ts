import { Module } from '@nestjs/common';
import { usersProviders } from 'src/modules/users/users.providers';

@Module({
  exports: [...usersProviders],
  providers: [...usersProviders],
})
export class UsersModule {}
