import { Entity } from '@fit-friends-1/util/util-types';
import { MailQueue } from '@fit-friends-1/shared/app-types';

export class MailQueueEntity implements Entity<MailQueueEntity>, MailQueue {
  public emails: string[];
  public training: string;

  constructor(entity: MailQueue) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: MailQueue) {
    this.emails = entity.emails;
    this.training = entity.training;
  }

  public toObject(): MailQueueEntity {
    return { ...this }
  }
}
