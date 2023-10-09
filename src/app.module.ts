import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database/database-config';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CityModule } from './modules/city/city.module';
import { EventModule } from './modules/event/event.module';
import { StateModule } from './modules/state/state.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ThrottlerModule.forRoot([
      {
        name: 'limitPerSecond',
        limit: 3,
        ttl: 1 * 1000,
      },
      {
        name: 'limitPerHour',
        limit: 500,
        ttl: 3600 * 1000,
      },
      {
        name: 'limitPerDay',
        limit: 1000,
        ttl: 84600 * 1000,
      },
      {
        limit: 5000,
        ttl: 84600 * 7 * 1000,
      },
    ]),
    UserModule,
    AuthModule,
    EventModule,
    CityModule,
    StateModule,
    AddressModule,
    TicketModule,
  ],
})
export class AppModule {}
