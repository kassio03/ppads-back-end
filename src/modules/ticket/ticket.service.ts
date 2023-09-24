import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateQRCode } from '../../common/utils';
import { EventService } from '../event/event.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketEntity } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly repository: Repository<TicketEntity>,
    private readonly eventRepository: EventService,
  ) {}

  async create(body: CreateTicketDto, userId: string) {
    const specificEvent = await this.eventRepository.findOne(body.eventId);

    if (!specificEvent) {
      throw new NotFoundException('Evento não encontrado.');
    }
    if (specificEvent.tickets.length >= specificEvent.totalTickets) {
      throw new BadRequestException('Ingressos esgotados.');
    }

    const qrCode = await generateQRCode(body.eventId + userId + '123');
    const entityToInsert = this.repository.create();
    entityToInsert.eventId = body.eventId;
    entityToInsert.userId = userId;
    entityToInsert.qrCode = qrCode;
    const entityInserted = await this.repository.save(entityToInsert);
    await this.eventRepository.updateRemainingTickets(body.eventId);
    return entityInserted;
  }

  async findOneAndValidate(qrCode: string, userId: string) {
    const specificTicketEntity = await this.repository.findOne({
      where: { qrCode },
    });
    if (!specificTicketEntity) {
      throw new NotFoundException('QRCode não encontrado.');
    }
    if (specificTicketEntity.alreadyUsed)
      throw new BadRequestException(`
        QRCode foi utilizado as: ${new Date(specificTicketEntity.usedAt)}.
      `);
    const specificEventEntity = await this.eventRepository.findOne(
      specificTicketEntity.eventId,
    );
    if (!specificEventEntity)
      throw new NotFoundException('Evento não encontrado');
    if (specificEventEntity.authorId !== userId) {
      throw new BadRequestException(
        'Somente o organizador pode validar o QRCode.',
      );
    }

    const body = {
      alreadyUsed: true,
      usedAt: new Date(),
      qrCode:
        'This QRCode has already been used     ' + specificTicketEntity.qrCode,
    };
    await this.repository.update(specificTicketEntity.id, body);
  }

  async update(id: string, body: UpdateTicketDto) {
    const ticketToUpdate = await this.repository.findOne({
      where: { id },
    });
    // todo: no front end o qrcode só é exibido pro usuario se ele ainda não foi utilizado.
    ticketToUpdate.alreadyUsed = body.alreadyUsed;
    ticketToUpdate.usedAt = body.usedAt;
    ticketToUpdate.qrCode = body.qrCode;
    await this.repository.save(ticketToUpdate);
  }
}
