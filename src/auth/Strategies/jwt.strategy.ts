import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test123',
    });
  }

  async validate(payload: { id: string }) {
    const user = await this.userService.findById(+payload.id);

    if (!user) {
      throw new UnauthorizedException("You don't have access");
    }

    return {
      id: user.id,
    };
  }
}