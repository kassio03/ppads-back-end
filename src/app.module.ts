import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database/database-config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), UsersModule, AuthModule],
})
export class AppModule {}
