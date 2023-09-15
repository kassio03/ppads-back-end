import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private repository: Repository<CityEntity>,
  ) {}

  // todo: desfazer pq ficou redundante
  async findAllCitiesByStateId(data): Promise<CityEntity[]> {
    const allEntities = await this.repository.find({
      where: data,
      relations: { state: true },
    });
    return allEntities;
  }
}
