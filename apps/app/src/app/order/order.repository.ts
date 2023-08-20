import { Injectable } from '@nestjs/common';
import { FieldList, Order } from '@fit-friends-1/shared/app-types';
import { OrderModel } from './order.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CoachOrderQuery } from './query/coach-order.query';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>
  ) { }

  public async create(item: OrderEntity): Promise<Order> {
    const newTraining = new this.orderModel(item);
    return newTraining.save();
  }

  public async index(
    trainingIds: string[],
    { limit, page, sortDirection, category }: CoachOrderQuery
  ): Promise<Order[]> {
    return this.orderModel
      .find({ training: { $in: trainingIds } })
      .sort([[category, sortDirection]])
      .skip(page * limit)
      .limit(limit)
      .populate(FieldList.Training)
      .exec();
  }
}
