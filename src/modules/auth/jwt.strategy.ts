import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../user/users.service';
import { JwtDto } from './dtos';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(data: JwtDto) {
    const res = await this.usersService.findOne({
      email: data.email,
    });
    if (!res) throw new UnauthorizedException('Email e/ou senha inválidos(s)');
    return res;
  }
}
