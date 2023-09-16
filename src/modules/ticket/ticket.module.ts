import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './../event/event.module';
import { TicketEntity } from './entities/ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity]), EventModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
