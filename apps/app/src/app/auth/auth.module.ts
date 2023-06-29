import { Module } from '@nestjs/common';
import { AuthenticationController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@fit-friends-1/shared/configs';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { JwtUserStrategy } from './strategies/jwt-user.strategy';
import { JwtCoachStrategy } from './strategies/jwt-coach.strategy';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    RefreshTokenModule,
    FileModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthService,
    JwtAccessStrategy,
    JwtUserStrategy,
    JwtCoachStrategy,
    JwtRefreshStrategy
  ]
})
export class AuthModule { }
