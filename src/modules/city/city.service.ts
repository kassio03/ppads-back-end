import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly repository: Repository<CityEntity>,
  ) {}

  async findAllCitiesByStateId(stateId: string): Promise<CityEntity[]> {
    const allEntities = await this.repository.find({
      where: { stateId },
      relations: { state: true },
      select: { id: true, name: true },
    });

    if (!allEntities)
      throw new NotFoundException('Cidades não foram encontradas');

    return allEntities;
  }

  async findOne(id: string): Promise<CityEntity> {
    const specificEntity = await this.repository.findOne({ where: { id } });

    if (!specificEntity)
      throw new NotFoundException('Cidade não foi encontrada');

    return specificEntity;
  }
}
