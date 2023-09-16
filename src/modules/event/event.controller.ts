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
import { successBody } from 'src/common/utils';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Post()
  @UseGuards(JwtGuard)
  async create(
    @Body() createEventDto: CreateEventDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.eventService.create(createEventDto, user);
  }

  @Get()
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @CurrentUser() user: UserEntity,
  ) {
    const res = await this.eventService.update(id, updateEventDto, user.id);
    return successBody(res);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
