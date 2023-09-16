import { EventEntity } from 'src/modules/event/entities/event.entity';
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

@Entity('ticket')
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'eventId',
  })
  eventId: string;

  @ManyToOne(() => EventEntity, (event) => event)
  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  event: EventEntity;

  @Column({
    type: 'varchar',
    name: 'userId',
  })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  // todo: qrCode tem q ser unique
  @Column({
    type: 'varchar',
    name: 'qrCode',
  })
  qrCode: string;

  @Column({
    type: 'boolean',
    name: 'alreadyUsed',
    default: false,
  })
  alreadyUsed: boolean;

  @Column({
    type: 'timestamp',
    name: 'usedAt',
    nullable: true,
  })
  usedAt: Date;

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
