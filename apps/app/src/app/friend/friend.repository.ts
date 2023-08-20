import { Injectable } from '@nestjs/common';
import { FriendEntity } from './friend.entity';
import { FieldList, Friend, } from '@fit-friends-1/shared/app-types';
import { FriendModel } from './friend.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FriendRepository {
  constructor(
    @InjectModel(FriendModel.name) private readonly friendModel: Model<FriendModel>) {
  }

  public async create(item: FriendEntity): Promise<Friend> {
    const newFriend = new this.friendModel(item);
    return newFriend.save();
  }

  public async index(userId: string): Promise<Friend[] | null> {
    return this.friendModel
      .find({ $or: [{ userId }, { friend: userId }] })
      .populate([FieldList.Friend, {
        path: FieldList.Friend,
        populate: FieldList.Avatar
      }])
      .exec();
  }

  public async check(userId: string, friend: string): Promise<Friend | null> {
    return this.friendModel
      .findOne({ $or: [{ userId, friend }, { userId: friend, friend: userId }] })
      .exec();
  }

  public async destroy(userId: string, friend: string) {
    return this.friendModel
      .deleteOne({ $or: [{ userId, friend }, { userId: friend, friend: userId }] })
      .exec();
  }
}
