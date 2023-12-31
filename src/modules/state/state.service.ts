import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly repository: Repository<StateEntity>,
  ) {}

  async findAll(): Promise<StateEntity[]> {
    const allEntities = await this.repository.find();
    return allEntities;
  }
}
