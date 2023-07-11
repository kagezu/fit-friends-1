import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriberModel, SubscriberSchema } from './subscriber.model';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriberModel.name, schema: SubscriberSchema }
    ]),
  ],
  controllers: [SubscriberController],
  providers: [
    SubscriberService,
    SubscriberRepository,
    SubscriberController
  ],
  exports: [
    SubscriberRepository
  ]
})
export class SubscriberModule { }
