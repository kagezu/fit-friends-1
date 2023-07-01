import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload, UserRole } from '@fit-friends-1/shared/app-types';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtCoachStrategy extends PassportStrategy(Strategy, 'jwt-coach') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessTokenSecret')
    });
  }

  public async validate(payload: TokenPayload) {
    if (payload.role !== UserRole.Coach) {
      throw new UnauthorizedException(`Access only for users with a role: '${UserRole.Coach}'`);
    }
    return this.userService.getUserEntity(payload.email);
  }
}
