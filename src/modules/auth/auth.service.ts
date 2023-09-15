import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user/users.service';
import { LoginRequestDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginRequestDto) {
    const user = await this.usersService.findOne({
      email: data.email,
      password: data.password,
    });
    if (!user) throw new UnauthorizedException('Email e/ou senha inválidos(s)');
    return {
      token: this.jwtService.sign(
        {
          email: data.email,
          id: user.id,
        },
        {
          expiresIn: Number(process.env.TOKEN_TIME_SECS),
        },
      ),
    };
  }
}
