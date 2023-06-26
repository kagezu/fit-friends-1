import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ]),
    ConfigModule
  ],
  providers: [
    UserRepository,
    UserService,
    UserController
  ],
  exports: [
    UserRepository,
    UserService
  ],
  controllers: [UserController],
})
export class UserModule { }
