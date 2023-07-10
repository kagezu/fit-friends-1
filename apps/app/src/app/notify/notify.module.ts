import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModel, NotifySchema } from './notify.model';
import { NotifyRepository } from './notify.repository';
import { ConfigModule } from '@nestjs/config';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: NotifyModel.name, schema: NotifySchema }
  ]),
    ConfigModule,
  ],
  providers: [
    NotifyRepository,
    NotifyService,
    NotifyController
  ],
  controllers: [NotifyController],
  exports: [
    NotifyService,
    NotifyRepository
  ]
})
export class NotifyModule { }
