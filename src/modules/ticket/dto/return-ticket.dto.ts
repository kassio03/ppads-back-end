import { TicketEntity } from '../entities/ticket.entity';

export class ReturnTicketDto {
  constructor(ticketEntity: TicketEntity) {
    this.qrCode = ticketEntity.qrCode;
  }
  qrCode: string;
}
