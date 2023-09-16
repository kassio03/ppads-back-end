import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { successBody } from 'src/common/utils';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateUserDto, ReturnUserDto, UpdateUserDto } from './dtos';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async post(@Body() body: CreateUserDto) {
    const res = await this.userService.insert(body);
    return successBody(new ReturnUserDto(res), 201);
  }

  @Put()
  @UseGuards(JwtGuard)
  async put(@Body() body: UpdateUserDto, @CurrentUser() user: UserEntity) {
    await this.userService.update(user.id, body);
    return successBody();
  }

  @Delete()
  @UseGuards(JwtGuard)
  async delete(@CurrentUser() user: UserEntity) {
    await this.userService.delete(user.id);
    return successBody();
  }

  @Get()
  @UseGuards(JwtGuard)
  async get(@CurrentUser() user: UserEntity) {
    const res = await this.userService.findOne({ id: user.id });
    return successBody(new ReturnUserDto(res));
  }
}
