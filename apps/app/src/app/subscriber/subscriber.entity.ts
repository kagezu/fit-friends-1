import { Entity } from '@fit-friends-1/util/util-types';
import { Subscriber } from '@fit-friends-1/shared/app-types';

export class SubscriberEntity implements Entity<SubscriberEntity>, Subscriber {
  email: string;
  coach: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: Subscriber) {
    this.email = entity.email;
    this.coach = entity.coach;
  }

  public toObject(): SubscriberEntity {
    return { ...this };
  }
}
