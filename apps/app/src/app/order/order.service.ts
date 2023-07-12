import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { plainToInstance } from 'class-transformer';
import { CoachOrderQuery } from './query/coach-order.query';
import { OrderCreateDto } from './dto/order-create.dto';
import { PurchaseType } from '@fit-friends-1/shared/app-types';
import { TrainingRepository } from '../training/training.repository';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly trainingRepository: TrainingRepository,
  ) { }

  /**  Создание нового заказа */
  public async create(dto: OrderCreateDto) {
    const existTraining = await this.trainingRepository.findById(dto.training);
    if (!existTraining) {
      throw new NotFoundException('Training  not found.');
    }

    const orderEntity = new OrderEntity({
      ...dto,
      purchaseType: PurchaseType.Subscription,
      price: existTraining.price,
      orderPrice: existTraining.price * dto.count
    });

    return this.orderRepository.create(orderEntity);
  }

  /** Список заказов тренера */
  public async list(coachId: string, query: CoachOrderQuery) {
    const orderQuery = plainToInstance(
      CoachOrderQuery,
      query,
      { enableImplicitConversion: true });
    return this.orderRepository.list(coachId, orderQuery);
  }
}
