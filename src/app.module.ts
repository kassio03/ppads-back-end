import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database/database-config';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CityModule } from './modules/city/city.module';
import { EventModule } from './modules/event/event.module';
import { StateModule } from './modules/state/state.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UserModule } from './modules/user/user.module';
// todo: too many requests
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
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
