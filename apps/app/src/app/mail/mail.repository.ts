import { Injectable } from '@nestjs/common';
import { MailModel } from './mail.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailQueue, FieldList } from '@fit-friends-1/shared/app-types';
import { MailQueueEntity } from './mail-queue.entity';

@Injectable()
export class MailRepository {
  constructor(
    @InjectModel(MailModel.name) private readonly mailModel: Model<MailModel>) {
  }

  public async create(item: MailQueueEntity): Promise<MailQueue> {
    const newMail = new this.mailModel(item);
    return newMail.save();
  }

  public async index() {
    return this.mailModel
      .find()
      .populate(FieldList.Training)
      .exec();
  }

  public async destroy() {
    return this.mailModel
      .deleteMany()
      .exec();
  }
}
