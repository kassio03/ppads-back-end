import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRequestDto, UpdateUserRequestDto } from './dtos';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async insert(body: CreateUserRequestDto): Promise<string> {
    const entityToInsert = this.repository.create();
    entityToInsert.name = body.name;
    entityToInsert.email = body.email;
    entityToInsert.password = body.password;
    const res = await this.repository.save(entityToInsert);
    return res.id;
  }

  async update(id: string, body: UpdateUserRequestDto): Promise<void> {
    const entityToUpdate = await this.repository.findOne({ where: { id } });
    if (!entityToUpdate)
      throw new NotFoundException('Usuário não foi encontrado');
    entityToUpdate.name = body.name;
    await this.repository.save(entityToUpdate);
  }

  async delete(id: string): Promise<void> {
    const entityToDelete = await this.repository.findOne({ where: { id } });
    if (!entityToDelete)
      throw new NotFoundException('Usuário não foi encontrado');
    await this.repository.softDelete(id);
  }

  async findOne(data: Partial<UserEntity>): Promise<UserEntity> {
    const entityToReturn = await this.repository.findOne({ where: data });
    return entityToReturn;
  }
}
