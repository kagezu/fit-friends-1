import { Module } from '@nestjs/common';
import { getMailerAsyncOptions } from '@fit-friends-1/util/util-core';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { SubscriberModule } from '../subscriber/subscriber.module';
import { MailRepository } from './mail.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModel, MailSchema } from './mail.model';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MailModel.name, schema: MailSchema }
    ]),
    MailerModule.forRootAsync(getMailerAsyncOptions('mail')),
    SubscriberModule
  ],
  providers: [
    MailService,
    MailRepository,
    MailController
  ],
  controllers: [MailController],
  exports: [
    MailService
  ]
})
export class MailModule { }
