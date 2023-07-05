import { Injectable } from '@nestjs/common';
import { Order } from '@fit-friends-1/shared/app-types';
import { OrderModel } from './order.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CoachOrderQuery } from './query/coach-order.query';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>) {
  }

  public async list(
    coachId: string,
    { limit, page, sortDirection, category }: CoachOrderQuery
  ): Promise<Order[]> {
    return this.orderModel
      .find({ coachId })
      .sort([[category, sortDirection]])
      .skip(page * limit)
      .limit(limit)
      .populate('training')
      .exec();
  }
}
