import { Injectable } from '@nestjs/common';
import { NotifyEntity } from './notify.entity';
import { FieldList, Notify, SortDirection } from '@fit-friends-1/shared/app-types';
import { NotifyModel } from './notify.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NotifyRepository {
  constructor(
    @InjectModel(NotifyModel.name) private readonly NotifyModel: Model<NotifyModel>) {
  }

  public async create(item: NotifyEntity): Promise<Notify> {
    const newNotify = new this.NotifyModel(item);
    return newNotify.save();
  }

  public async index(user: string): Promise<Notify[] | null> {
    return this.NotifyModel
      .find({ user })
      .sort([[FieldList.CreatedAt, SortDirection.Desc]])
      .exec();
  }

  public async destroy(user: string, id: string) {
    return this.NotifyModel
      .deleteOne({ _id: id, user })
      .exec();
  }
}
