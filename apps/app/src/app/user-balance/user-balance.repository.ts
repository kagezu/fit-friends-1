import { Injectable } from '@nestjs/common';
import { FieldList, UserBalance } from '@fit-friends-1/shared/app-types';
import { UserBalanceModel } from './user-balance.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserBalanceRepository {
  constructor(
    @InjectModel(UserBalanceModel.name) private readonly userBalanceModel: Model<UserBalanceModel>) {
  }

  public async create(item: UserBalance): Promise<UserBalance> {
    const newUserBalance = new this.userBalanceModel(item);
    return newUserBalance.save();
  }

  public async update(item: UserBalance): Promise<UserBalance | null> {
    return this.userBalanceModel
      .findOneAndUpdate(
        { userId: item.userId, training: item.training },
        item
      )
      .exec();
  }

  public async index(userId: string): Promise<UserBalance[] | null> {
    return this.userBalanceModel
      .find({ userId })
      .populate(FieldList.Training)
      .exec();
  }

  public async show(userId: string, training: string): Promise<UserBalance | null> {
    return this.userBalanceModel
      .findOne({ userId, training })
      .populate(FieldList.Training)
      .exec();
  }

  public async destroy(userId: string, training: string) {
    return this.userBalanceModel
      .findOneAndDelete({ userId, training })
      .exec();
  }
}
