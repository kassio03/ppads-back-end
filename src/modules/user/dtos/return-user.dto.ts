import { EventEntity } from '../../../modules/event/entities/event.entity';
import { TicketEntity } from '../../../modules/ticket/entities/ticket.entity';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.events = userEntity.events;
    this.tickets = userEntity.tickets;
  }
  id: string;
  name: string;
  email: string;
  events?: EventEntity[];
  tickets?: TicketEntity[];
}
