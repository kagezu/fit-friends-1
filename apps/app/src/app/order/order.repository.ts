import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { Order } from '@fit-friends-1/shared/app-types';
import { OrderModel } from './order.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>) {
  }

  public async list(
    coachId: string,
    { limit, page, sortDirection, priceFrom, priceTo, caloriesFrom, caloriesTo, rating, interval }: OrderQuery
  ): Promise<Order[]> {
    return this.orderModel
      .find({
        coachId,
        price: { $gte: priceFrom, $lte: priceTo },
        calories: { $gte: caloriesFrom, $lte: caloriesTo },
        rating,
        interval: interval ? { $in: interval } : {}
      })
      .sort([['createdAt', sortDirection]])
      .skip(page * limit)
      .limit(limit)
      .populate('demoVideo')
      .exec();
  }
}
