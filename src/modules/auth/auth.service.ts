import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginRequestDto) {
    const user = await this.userService.findOne({
      email: data.email,
    });
    if (!user) throw new UnauthorizedException('Email e/ou senha inválidos.');
    const isPasswordValid = await compare(data.password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Email e/ou senha inválidos.');
    return {
      token: this.jwtService.sign(
        {
          email: user.email,
          id: user.id,
        },
        {
          expiresIn: Number(process.env.TOKEN_TIME_SECS),
        },
      ),
    };
  }
}
