import { CityEntity } from 'src/modules/city/entities/city.entity';
import { EventEntity } from 'src/modules/event/entities/event.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'complement',
    nullable: true,
  })
  complement: string;

  @Column({
    type: 'varchar',
    name: 'houseNumber',
  })
  houseNumber: number;

  @Column({
    type: 'varchar',
    name: 'cep',
  })
  cep: string;

  @Column({
    type: 'varchar',
    name: 'cityId',
  })
  cityId: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @ManyToOne(() => CityEntity, (city) => city)
  @JoinColumn({ name: 'cityId', referencedColumnName: 'id' })
  city: CityEntity;

  @OneToMany(() => EventEntity, (event) => event)
  events: EventEntity[];
}
