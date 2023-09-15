import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { StateEntity } from 'src/modules/state/entities/state.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('city')
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;
  //todo: add @IsNotEmpty() to the fields
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