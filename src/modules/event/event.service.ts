import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/event.entity';
import { eventUtilFields } from './utils/event-util-fields';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repository: Repository<EventEntity>,
  ) {}
  async create(body: CreateEventDto, user: UserEntity): Promise<EventEntity> {
    //todo: precisa ver se o addressId já existe
    const entityToInsert = this.repository.create();

    entityToInsert.title = body.title;
    entityToInsert.description = body.description;
    entityToInsert.remainingTickets = body.remainingTickets;
    entityToInsert.totalTickets = body.remainingTickets;
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
      select: eventUtilFields,
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
      select: eventUtilFields,
    });

    if (!specificEntity)
      throw new NotFoundException('Evento não foi encontrado');

    return specificEntity;
  }
  async update(eventId: string, body: UpdateEventDto, userId: string) {
    const entityToUpdate = await this.repository.findOne({
      where: { id: eventId },
    });
    if (!entityToUpdate)
      throw new NotFoundException('Evento não foi encontrado');
    if (!(entityToUpdate.authorId === userId)) {
      throw new UnauthorizedException(
        'Este evento não pertence ao usuário atualmente logado.',
      );
    }
    entityToUpdate.description = body.description;
    entityToUpdate.title = body.title;
    // todo: preciso chamar na geração do ticket?

    const updatedEntity = await this.repository.save(entityToUpdate);
    return updatedEntity;
  }

  async updateRemainingTickets(id: string) {
    const entityToUpdate = await this.repository.findOne({
      where: { id },
    });
    entityToUpdate.remainingTickets -= 1;
    await this.repository.save(entityToUpdate);
  }

  async remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
