import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { successBody } from '../../common/utils';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ReturnTicketDto } from './dto/return-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  //todo: inserir um numero de tickets pq tá gerando só 1 a cada post
  @Post('generate')
  @UseGuards(JwtGuard)
  async create(@Body() body: CreateTicketDto, @CurrentUser() user: UserEntity) {
    const res = await this.ticketService.create(body, user.id);
    return successBody(new ReturnTicketDto(res));
  }

  @Post('validate')
  @UseGuards(JwtGuard)
  async findOne(
    @Body() body: { qrCode: string },
    @CurrentUser() user: UserEntity,
  ) {
    await this.ticketService.findOneAndValidate(body.qrCode, user.id);
    return successBody({ message: 'QRCode validado com sucesso.' });
  }
}
