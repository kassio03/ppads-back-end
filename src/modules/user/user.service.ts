import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async insert(body: CreateUserDto): Promise<UserEntity> {
    const passwordHashed = await hash(body.password, 10);
    const entityToInsert = this.repository.create();

    entityToInsert.name = body.name;
    entityToInsert.email = body.email;
    entityToInsert.password = passwordHashed;

    const entityInserted = await this.repository.save(entityToInsert);

    return {
      ...entityInserted,
      password: undefined,
    };
  }

  async update(id: string, body: UpdateUserDto): Promise<void> {
    const entityToUpdate = await this.repository.findOne({ where: { id } });
    if (!entityToUpdate)
      throw new NotFoundException('Usuário não foi encontrado');
    entityToUpdate.name = body.name;
    entityToUpdate.password = await hash(body.password, 10);
    await this.repository.save(entityToUpdate);
  }

  async delete(id: string): Promise<void> {
    const entityToDelete = await this.repository.findOne({ where: { id } });
    if (!entityToDelete)
      throw new NotFoundException('Usuário não foi encontrado');
    await this.repository.delete(id);
  }

  async findOne(data: Partial<UserEntity>): Promise<UserEntity> {
    const entityToReturn = await this.repository.findOne({ where: data });
    if (!entityToReturn)
      throw new NotFoundException('Usuário não foi encontrado');
    return entityToReturn;
  }
}
