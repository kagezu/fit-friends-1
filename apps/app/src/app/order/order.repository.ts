import { Injectable } from '@nestjs/common';
import { Order } from '@fit-friends-1/shared/app-types';
import { OrderModel } from './order.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CoachOrderQuery } from './query/coach-order.query';
import { OrderEntity } from './order.entity';
import { TrainingRepository } from '../training/training.repository';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderModel.name) private readonly orderModel: Model<OrderModel>,
    private readonly trainingRepository: TrainingRepository
  ) { }

  public async create(item: OrderEntity): Promise<Order> {
    const newTraining = new this.orderModel(item);
    return newTraining.save();
  }

  public async list(
    coachId: string,
    { limit, page, sortDirection, category }: CoachOrderQuery
  ): Promise<Order[]> {
    // const trainings = await this.trainingRepository.find({coachId}).exec();

    return this.orderModel
      .find({ coachId })
      .sort([[category, sortDirection]])
      .skip(page * limit)
      .limit(limit)
      .populate('training')
      .exec();
  }
}
