import { Injectable } from '@nestjs/common';
import { PersonalOrderEntity } from './personal-order.entity';
import { PersonalOrder } from '@fit-friends-1/shared/app-types';
import { PersonalOrderModel } from './personal-order.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PersonalOrderRepository {
  constructor(
    @InjectModel(PersonalOrderModel.name) private readonly personalOrderModel: Model<PersonalOrderModel>) {
  }

  public async create(item: PersonalOrderEntity): Promise<PersonalOrder> {
    const newPersonalOrder = new this.personalOrderModel(item);
    return newPersonalOrder.save();
  }

  public async index(user: string): Promise<PersonalOrder[] | null> {
    return this.personalOrderModel
      .find({ user })
      .exec();
  }

  public async show(id: string): Promise<PersonalOrder | null> {
    return this.personalOrderModel
      .findById(id)
      .exec();
  }

  public async update(id: string, item: PersonalOrderEntity): Promise<PersonalOrder> {
    return this.personalOrderModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
