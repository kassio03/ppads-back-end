import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { successBody } from 'src/common/utils';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateUserRequestDto, UpdateUserRequestDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async post(@Body() body: CreateUserRequestDto) {
    const res = await this.usersService.insert(body);
    return successBody({ id: res }, 201);
  }

  @Put()
  @UseGuards(JwtGuard)
  async put(@Body() body: UpdateUserRequestDto, @Req() req: any) {
    await this.usersService.update(req.user.id, body);
    return successBody();
  }

  @Delete()
  @UseGuards(JwtGuard)
  async delete(@Req() req: any) {
    await this.usersService.delete(req.user.id);
    return successBody();
  }

  @Get()
  @UseGuards(JwtGuard)
  async get(@Req() req: any) {
    const res = await this.usersService.findOne({ id: req.user.id });
    return successBody(res);
  }
}
