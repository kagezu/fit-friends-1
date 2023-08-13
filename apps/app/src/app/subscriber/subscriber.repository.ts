import { SubscriberEntity } from './subscriber.entity';
import { Subscriber } from '@fit-friends-1/shared/app-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubscriberModel } from './subscriber.model';
import { Model } from 'mongoose';

@Injectable()
export class SubscriberRepository {
  constructor(
    @InjectModel(SubscriberModel.name) private readonly subscriberModel: Model<SubscriberModel>
  ) { }

  public async create(item: SubscriberEntity): Promise<Subscriber> {
    const newSubscriber = new this.subscriberModel(item);
    return newSubscriber.save();
  }

  public async destroy(email: string, coach: string): Promise<void> {
    this.subscriberModel
      .deleteOne({ email, coach });
  }

  public async check(email: string, coach: string): Promise<Subscriber | null> {
    return this.subscriberModel
      .findOne({ email, coach })
      .exec();
  }

  public async findByEmail(email: string): Promise<Subscriber[] | null> {
    return this.subscriberModel
      .find({ email })
      .exec();
  }

  public async findByCoach(coach: string): Promise<Subscriber[] | null> {
    return this.subscriberModel
      .find({ coach })
      .exec();
  }
}
