import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailRepository } from './mail.repository';
import { MailQueueEntity } from './mail-queue.entity';
import { SubscriberRepository } from '../subscriber/subscriber.repository';

const EMAIL_NEW_TRAINING_SUBJECT = 'New workout';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailRepository: MailRepository,
    private readonly subscriberRepository: SubscriberRepository,
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
            title: training['title']
          }
        })
      )
    );
    await this.mailRepository.destroy();
  }

  public async addNotify(coach: string, training: string) {
    const subscribers = await this.subscriberRepository.findByCoach(coach);
    if (!subscribers) {
      throw new NotFoundException('No subscribers.');
    }
    const emails = subscribers.map(({ email }) => email);
    const mailQueue = new MailQueueEntity({ emails, training });
    return this.mailRepository.create(mailQueue);
  }
}
