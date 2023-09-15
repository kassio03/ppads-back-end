import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/event.entity';
import { utilFields } from './utils/util-fields';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private repository: Repository<EventEntity>,
  ) {}
  async create(body: CreateEventDto, user: UserEntity): Promise<EventEntity> {
    const entityToInsert = this.repository.create();

    entityToInsert.title = body.title;
    entityToInsert.description = body.description;
    entityToInsert.remainingTickets = body.remainingTickets;
    entityToInsert.eventStartsAt = new Date(body.eventStartsAt);
    entityToInsert.eventFinishAt = new Date(body.eventFinishAt);
    entityToInsert.price = body.price;
    entityToInsert.poster = body.poster;
    entityToInsert.addressId = body.addressId;
    entityToInsert.authorId = user.id;

    const entityInserted = await this.repository.save(entityToInsert);

    return entityInserted;
  }

  async findAll(): Promise<EventEntity[]> {
    const allEntities = await this.repository.find({
      relations: {
        address: {
          city: {
            state: true,
          },
        },
      },
      select: utilFields,
    });

    return allEntities;
  }

  async findOne(id: string) {
    const specificEntity = await this.repository.findOne({
      where: { id },
      relations: {
        address: {
          city: {
            state: true,
          },
        },
      },
      select: utilFields,
    });

    if (!specificEntity)
      throw new NotFoundException('Evento não foi encontrado');

    return specificEntity;
  }

  async update(id: string, body: UpdateEventDto) {
    const entityToUpdate = await this.repository.findOne({
      where: { id },
    });
    entityToUpdate.description = body.description;
    entityToUpdate.title = body.title;

    if (!entityToUpdate)
      throw new NotFoundException('Evento não foi encontrado');

    await this.repository.save(entityToUpdate);
  }

  async remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
