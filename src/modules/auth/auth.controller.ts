import { Body, Controller, Post } from '@nestjs/common';
import { successBody } from 'src/common/utils';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<any> {
    const tokenBody = await this.authService.login(body);
    return successBody(tokenBody);
  }
}
