import { Module } from '@nestjs/common';
import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@fit-friends-1/shared/configs';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
  ]
})
export class AuthModule { }
