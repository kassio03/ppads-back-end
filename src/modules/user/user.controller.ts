import {
  Body,
  Controller,
  Delete,
  Get,
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
import { successBody } from '../../common/utils';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateUserDto, ReturnUserDto, UpdateUserDto } from './dtos';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastro de usuario.' })
  @ApiResponse({
    status: 201,
    description: 'Usuário cadastrado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Informações passadas pelo body são inválidas.',
  })
  @ApiResponse({ status: 400, description: 'Email já registrado.' })
  async createUser(@Body() body: CreateUserDto) {
    const res = await this.userService.insert(body);
    return successBody(new ReturnUserDto(res), 201);
  }

  @Put()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'atualização de usuario, fornecer token de acesso.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualmente logado atualizado com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. (Verifica o token)',
  })
  async updateCurrentUser(
    @Body() body: UpdateUserDto,
    @CurrentUser() user: UserEntity,
  ) {
    await this.userService.update(user.id, body);
    return successBody();
  }

  @Delete()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Exclusão de usuário, fornecer token de acesso. Não necessita body.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário logado foi deletado com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. (Verifica o token)',
  })
  async deleteCurrentUser(@CurrentUser() user: UserEntity) {
    await this.userService.delete(user.id);
    return successBody();
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get dos dados do usuário, fornecer token de acesso. Não necessita body.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário logado recuperados com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado. (Verifica o token)',
  })
  async getCurrentUser(@CurrentUser() user: UserEntity) {
    const res = await this.userService.findOne({ id: user.id });
    return successBody(new ReturnUserDto(res));
  }
}
