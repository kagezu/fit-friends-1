import { Subscriber } from '@fit-friends-1/shared/app-types';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository
  ) { }

  public async add(subscriber: Subscriber) {
    const { coach, email } = subscriber;
    const existsCoach = await this.subscriberRepository.findByEmail(coach);
    if (!existsCoach) {
      throw new NotFoundException('Coach not found');
    }

    const existSubscriber = this.subscriberRepository.check(email, coach);
    if (existSubscriber) {
      throw new ConflictException('The subscription exist.');
    }

    return this.subscriberRepository
      .create(new SubscriberEntity(subscriber));
  }

  public async delete(mail: string, coach: string) {
    return this.subscriberRepository
      .destroy(mail, coach);
  }
}
