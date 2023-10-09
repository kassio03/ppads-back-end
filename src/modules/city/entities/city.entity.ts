import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from '../../../modules/address/entities/address.entity';
import { StateEntity } from '../../../modules/state/entities/state.entity';

@Entity('city')
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'stateId',
  })
  stateId: string;

  @ManyToOne(() => StateEntity, (state) => state.cities)
  @JoinColumn({ name: 'stateId', referencedColumnName: 'id' })
  state: StateEntity;

  @OneToMany(() => AddressEntity, (address) => address)
  addresses: AddressEntity[];
}
