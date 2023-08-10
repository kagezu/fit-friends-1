import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { plainToInstance } from 'class-transformer';
import { CoachOrderQuery } from './query/coach-order.query';
import { OrderCreateDto } from './dto/order-create.dto';
import { PurchaseType } from '@fit-friends-1/shared/app-types';
import { TrainingRepository } from '../training/training.repository';
import { OrderEntity } from './order.entity';
import { UserBalanceService } from '../user-balance/user-balance.service';
import { TrainingEntity } from '../training/training.entity';

const TRAINING_NOT_FOUND = 'Training not found.';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly trainingRepository: TrainingRepository,
    private readonly userBalanceService: UserBalanceService,
  ) { }

  /**  Создание нового заказа */
  public async create(userId: string, dto: OrderCreateDto) {
    const existTraining = await this.trainingRepository.findById(dto.training);
    if (!existTraining) {
      throw new NotFoundException(TRAINING_NOT_FOUND);
    }

    const newBalance = await this.userBalanceService.increase(
      userId,
      {
        training: dto.training,
        count: dto.count
      });

    await this.trainingRepository.update(
      dto.training,
      new TrainingEntity({
        ...existTraining,
        totalSale: existTraining.totalSale + dto.count,
        totalAmount: existTraining.totalAmount + existTraining.price * dto.count
      }));

    const orderEntity = new OrderEntity({
      ...dto,
      purchaseType: PurchaseType.Subscription,
      price: existTraining.price,
      orderPrice: existTraining.price * dto.count
    });

    await this.orderRepository.create(orderEntity);

    return newBalance;
  }

  /** Список заказов тренера */
  public async index(coachId: string, query: CoachOrderQuery) {
    const orderQuery = plainToInstance(
      CoachOrderQuery,
      query,
      { enableImplicitConversion: true });
    const trainings = await this.trainingRepository.findByCoach(coachId);
    const trainingIds = trainings.map(({ _id }) => _id.toString());
    return this.orderRepository.index(trainingIds, orderQuery);
  }
}
