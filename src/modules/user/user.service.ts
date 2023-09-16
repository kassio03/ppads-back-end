import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserEntity } from './entities/user.entity';
import { userUtilFields } from './utils/user-util-fields';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async insert(body: CreateUserDto): Promise<UserEntity> {
    const userEmailAlreadyExists = await this.repository.findOne({
      where: { email: body.email },
    });
    if (userEmailAlreadyExists) {
      throw new BadRequestException('email já registrado');
    }
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
    entityToUpdate.name = body.name || entityToUpdate.name;
    entityToUpdate.password = body.password
      ? await hash(body.password, 10)
      : entityToUpdate.password;
    await this.repository.save(entityToUpdate);
  }
  //todo: se deletar a conta todos os eventos associados a ela deveriam ser deletados? mas aí gera uma treta pq permite um golpe de apagar o evento apos a venda de ingressos
  //solution: uma conta com eventos ativos não pode ser deletada.
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findOne(data: Partial<UserEntity>): Promise<UserEntity> {
    const entityToReturn = await this.repository.findOne({
      where: data,
      relations: { events: true, tickets: true },
      select: userUtilFields,
    });
    return entityToReturn;
  }
}
