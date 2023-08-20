import { Subscriber } from '@fit-friends-1/shared/app-types';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

enum ExceptionMessage {
  NotFound = 'Coach not found',
  SubscriptionExist = 'The subscription exist.'
}

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository
  ) { }

  public async add(subscriber: Subscriber) {
    const { coach, email } = subscriber;
    const existsCoach = await this.subscriberRepository.findByEmail(coach);
    if (!existsCoach) {
      throw new NotFoundException(ExceptionMessage.NotFound);
    }

    const existSubscriber = this.subscriberRepository.check(email, coach);
    if (existSubscriber) {
      return existSubscriber;
    }

    return this.subscriberRepository
      .create(new SubscriberEntity(subscriber));
  }

  public async check(mail: string, coach: string) {
    return this.subscriberRepository
      .check(mail, coach);
  }

  public async delete(mail: string, coach: string) {
    return this.subscriberRepository
      .destroy(mail, coach);
  }
}
