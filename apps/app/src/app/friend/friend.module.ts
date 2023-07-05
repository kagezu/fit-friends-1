import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendModel, FriendSchema } from './friend.model';
import { FriendRepository } from './friend.repository';
import { ConfigModule } from '@nestjs/config';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: FriendModel.name, schema: FriendSchema }
  ]),
    ConfigModule,
  ],
  providers: [
    FriendRepository,
    FriendService,
    FriendController
  ],
  controllers: [FriendController],
})
export class FriendModule { }
