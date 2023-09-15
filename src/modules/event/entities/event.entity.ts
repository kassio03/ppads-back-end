import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({
    type: 'timestamp',
    name: 'startsAt',
    unique: true,
  })
  eventStartsAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'finishAt',
    unique: true,
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
