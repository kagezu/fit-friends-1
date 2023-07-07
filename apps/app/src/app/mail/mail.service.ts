import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailRepository } from './mail.repository';
import { SubscriberService } from '../subscriber/subscriber.service';
import { MailQueueEntity } from './mail-queue.entity';

const EMAIL_NEW_TRAINING_SUBJECT = 'New workout';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailRepository: MailRepository,
    private readonly subscriberService: SubscriberService,
  ) { }

  public async sendNotifyNewTraining() {
    const mails = await this.mailRepository.index();
    if (!mails) {
      throw new NotFoundException('No messages in queue.');
    }
    mails.map(({ emails, training }) =>
      emails.map(async (email: string) =>
        await this.mailerService.sendMail({
          to: email,
          subject: EMAIL_NEW_TRAINING_SUBJECT,
          template: './new-training',
          context: {
            email,
            title: training['title'],
            id: training['_id'].toString(),
          }
        })
      )
    );
    await this.mailRepository.destroy();
  }

  public async addNotify(coach: string, training: string) {
    const subscribers = await this.subscriberService.findByCoach(coach);
    if (!subscribers) {
      throw new NotFoundException('No subscribers.');
    }
    const emails = subscribers.map(({ email }) => email);
    const mailQueue = new MailQueueEntity({ emails, training });
    return this.mailRepository.create(mailQueue);
  }
}
