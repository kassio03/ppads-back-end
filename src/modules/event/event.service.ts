import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sendBase64 } from 'src/common/utils/google-cloud-storage';
import { MoreThan, Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
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
    private readonly addressService: AddressService,
  ) {}
  //todo: verificar se já tem um evento cadastrado no mesmo horario do mesmo endereço
  async create(body: CreateEventDto, user: UserEntity): Promise<EventEntity> {
    const insertedAddress = await this.addressService.create(body.address);

    const entityToInsert = this.repository.create();

    entityToInsert.title = body.title;
    entityToInsert.description = body.description;
    entityToInsert.remainingTickets = body.remainingTickets;
    entityToInsert.totalTickets = body.remainingTickets;
    entityToInsert.eventStartsAt = new Date(body.eventStartsAt);
    entityToInsert.eventFinishAt = new Date(body.eventFinishAt);
    entityToInsert.price = body.price;
    entityToInsert.poster = sendBase64(body.poster);
    entityToInsert.addressId = insertedAddress.id;
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
      where: { eventFinishAt: MoreThan(new Date()) },
    });

    return allEntities;
  }

  async findOne(id: string): Promise<EventEntity> {
    const specificEntity = await this.repository.findOne({
      where: { id },
      relations: {
        address: {
          city: {
            state: true,
          },
        },
        tickets: true,
      },
      select: eventUtilFields,
    });

    if (!specificEntity)
      throw new NotFoundException('Evento não foi encontrado');

    return specificEntity;
  }
  async update(
    eventId: string,
    body: UpdateEventDto,
    userId: string,
  ): Promise<EventEntity> {
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

    const updatedEntity = await this.repository.save(entityToUpdate);
    return updatedEntity;
  }

  async updateRemainingTickets(id: string): Promise<void> {
    const entityToUpdate = await this.repository.findOne({
      where: { id },
    });
    entityToUpdate.remainingTickets -= 1;
    await this.repository.save(entityToUpdate);
  }

  async remove(id: string, userId: string): Promise<string> {
    userId;
    await this.repository.delete(id);
    return `This action removes a #${id + userId} event`;
  }
}
