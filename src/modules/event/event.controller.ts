import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { successBody } from '../../common/utils';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(ThrottlerGuard)
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Throttle({ default: { limit: 200, ttl: 84600 } })
  @Post()
  @ApiOperation({ summary: 'Criação de evento.' })
  @ApiResponse({ status: 201, description: 'Evento criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Informações passadas pelo body são inválidas.',
  })
  @ApiResponse({ status: 429, description: 'Muitas requisições.' })
  async create(
    @Body() createEventDto: CreateEventDto,
    @CurrentUser() user: UserEntity,
  ) {
    const res = await this.eventService.create(createEventDto, user);
    return successBody(res, 201);
  }

  @ApiOperation({ summary: 'Busca de todos os eventos.' })
  @ApiResponse({ status: 200, description: 'Eventos recuperados.' })
  @Get()
  async findAll() {
    const res = await this.eventService.findAll();
    return successBody(res);
  }

  @ApiOperation({ summary: 'Busca de um evento específico.' })
  @ApiResponse({ status: 200, description: 'Evento recuperado.' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.eventService.findOne(id);
    return successBody({ ...res, tickets: undefined });
  }

  @ApiOperation({ summary: 'Atualizar evento.' })
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Evento atualizado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Informações passadas pelo body são inválidas.',
  })
  @ApiResponse({
    status: 401,
    description: 'Este evento não pertence ao usuário atualmente logado.',
  })
  @ApiResponse({ status: 404, description: 'Evento não foi encontrado.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @CurrentUser() user: UserEntity,
  ) {
    const res = await this.eventService.update(id, updateEventDto, user.id);
    return successBody(res);
  }

  // todo: esse método não deveria existir mas vou deixar momentaneamente para fins de teste.
  // inclusive qualquer um consegue deletar qq evento mas enfim, vai servir.
  @ApiOperation({ summary: 'Warning: Delete ainda não implementado.' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    await this.eventService.remove(id, user.id);
    return successBody();
  }
}
