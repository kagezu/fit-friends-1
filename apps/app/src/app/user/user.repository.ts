import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { User } from '@fit-friends-1/shared/app-types';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserQuery } from './query/user.query';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }

  public async create(item: UserEntity): Promise<User> {
    const newUser = new this.userModel(item);
    const user = await newUser.save();
    return this.findById(user._id);
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel
      .findById(id)
      .populate(['certificate', 'avatar'])
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({ email })
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .populate(['certificate', 'avatar'])
      .exec();
  }

  public async index({ limit, page, category, sortDirection, location, trainingLevel, trainingTypes }: UserQuery): Promise<User[]> {
    return this.userModel
      .find(Object.assign(
        location ? { location } : {},
        trainingLevel ? { trainingLevel } : {},
        trainingTypes ? { trainingTypes: { $in: trainingTypes } } : {}
      ))
      .sort([[category, sortDirection]])
      .skip(page * limit)
      .limit(limit)
      .populate(['certificate', 'avatar'])
      .exec();
  }
}
