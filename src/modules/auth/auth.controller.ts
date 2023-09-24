import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { successBody } from '../../common/utils';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Efetuar login.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário logado com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Email e/ou senha inválidos.',
  })
  async login(@Body() body: LoginRequestDto): Promise<any> {
    const tokenBody = await this.authService.login(body);
    return successBody(tokenBody);
  }
}
