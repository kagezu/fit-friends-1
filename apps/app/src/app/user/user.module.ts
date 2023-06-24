import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, userSchema } from './user.model';
import { UserRepository } from './user.repository';
import { getJwtOptions } from '@fit-friends-1/shared/configs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from '../auth/strategies/jwt-access.strategy';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserModel.name, schema: userSchema }
  ]),
    ConfigModule,
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: getJwtOptions
    // })
  ],
  providers: [
    UserRepository,
    JwtAccessStrategy],
  exports: [UserRepository
  ],
  controllers: [],
})
export class UserModule { }
