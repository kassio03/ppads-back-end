import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { successBody } from '../../common/utils';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ReturnTicketDto } from './dto/return-ticket.dto';
import { ValidateTicketDto } from './dto/validate-ticket.dto';
import { TicketService } from './ticket.service';

@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  //todo: inserir um numero de tickets pq tá gerando só 1 a cada post
  @ApiOperation({ summary: 'Criação do ticket/qrcode.' })
  @ApiResponse({ status: 201, description: 'Criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description:
      'Ingressos esgotados ou informações passadas pelo body são inválidas.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. Precisa estar logado.',
  })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  @ApiBearerAuth()
  @Post('generate')
  @UseGuards(JwtGuard)
  async create(@Body() body: CreateTicketDto, @CurrentUser() user: UserEntity) {
    const res = await this.ticketService.create(body, user.id);
    return successBody(new ReturnTicketDto(res), 201);
  }

  @ApiOperation({ summary: 'Validação do QRCode.' })
  @ApiResponse({ status: 200, description: 'QRCode validado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Somente o autor do evento pode validar o QRCode.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. Precisa estar logado.',
  })
  @ApiResponse({ status: 404, description: 'QRCode inválido.' })
  @ApiBearerAuth()
  @Post('validate')
  @UseGuards(JwtGuard)
  async findOne(
    @Body() body: ValidateTicketDto,
    @CurrentUser() user: UserEntity,
  ) {
    await this.ticketService.findOneAndValidate(body.qrCode, user.id);
    return successBody({ message: 'QRCode validado com sucesso.' });
  }
}
