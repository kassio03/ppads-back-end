import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from '../../../modules/address/entities/address.entity';
import { TicketEntity } from '../../../modules/ticket/entities/ticket.entity';
import { UserEntity } from '../../../modules/user/entities/user.entity';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'title',
  })
  title: string;

  @Column({
    type: 'varchar',
    name: 'description',
  })
  description: string;

  @Column({
    type: 'int',
    name: 'remainingTickets',
  })
  remainingTickets: number;

  @Column({
    type: 'int',
    name: 'totalTickets',
  })
  totalTickets: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'startsAt',
  })
  eventStartsAt: Date;

  // todo: remover unique
  @CreateDateColumn({
    type: 'timestamp',
    name: 'finishAt',
  })
  eventFinishAt: Date;

  @Column({
    type: 'float',
    name: 'price',
  })
  price: number;

  @Column({
    type: 'varchar',
    name: 'poster',
  })
  poster: string;

  @Column({
    type: 'varchar',
    name: 'addressId',
  })
  addressId: string;

  @ManyToOne(() => AddressEntity, (address) => address)
  @JoinColumn({ name: 'addressId', referencedColumnName: 'id' })
  address: AddressEntity;

  @Column({
    type: 'varchar',
    name: 'authorId',
  })
  authorId: string;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: UserEntity;

  @OneToMany(() => TicketEntity, (tickets) => tickets.event)
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
  })
  deletedAt: Date;
}
