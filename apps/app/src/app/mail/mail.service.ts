import { Subscriber } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_UPDATE_TASK } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';
import { TasksDto } from '../subscriber/dto/tasks.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: subscriber.name,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifications(subscribers: Subscriber[], dto: TasksDto) {
    const links = dto.ids
      .map((id) => `<a href="http://localhost:3333/api/tasks/${id}">${id}</a>`)
      .join('<br>');

    subscribers.map(async (subscriber) => await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_UPDATE_TASK,
      template: './send-notifications',
      context: {
        user: subscriber.name,
        links: links
      }
    }));
  }
}
