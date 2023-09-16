import { EventEntity } from 'src/modules/event/entities/event.entity';
import { TicketEntity } from 'src/modules/ticket/entities/ticket.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'password',
  })
  password: string;

  @OneToMany(() => EventEntity, (event) => event.author)
  events: EventEntity[];

  @OneToMany(() => TicketEntity, (ticket) => ticket.user)
  tickets: TicketEntity[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;
}
