import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CityEntity } from '../../../modules/city/entities/city.entity';

@Entity('state')
export class StateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'uf',
    unique: true,
  })
  uf: string;

  @OneToMany(() => CityEntity, (city) => city.state)
  cities: CityEntity[];
}
