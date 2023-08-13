import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PersonalOrderRepository } from './personal-order.repository';
import { PersonalOrderEntity } from './personal-order.entity';
import { OrderStatus, User } from '@fit-friends-1/shared/app-types';
import { UserService } from '../user/user.service';
import { NotifyService } from '../notify/notify.service';

enum ExceptionMessage {
  UserNotFound = 'User not exist.',
  OrderForYourself = 'You cannot create an order for yourself.',
  OrderNotExist = 'Personal order not exist.',
  OrderExist = 'Personal order exist.',
  CannotChangeStatus = 'You cannot change the status of this order',
  StatusNotChanged = 'Status not changed.'
}

@Injectable()
export class PersonalOrderService {
  constructor(
    private readonly personalOrderRepository: PersonalOrderRepository,
    private readonly userService: UserService,
    private readonly notifyService: NotifyService
  ) { }

  /** Проверка заявки */
  public async show(initiator: User, userId: string) {
    const existUser = this.userService.getUser(userId);
    if (!existUser) {
      throw new NotFoundException(ExceptionMessage.UserNotFound);
    }

    return await this.personalOrderRepository.show(userId, initiator._id);
  }

  /** Создание заявки на персональную/совместную тренировку */
  public async create(initiator: User, userId: string) {
    const existUser = this.userService.getUser(userId);
    if (!existUser) {
      throw new NotFoundException(ExceptionMessage.UserNotFound);
    }

    const existPersonalOrder = await this.personalOrderRepository.show(userId, initiator._id);
    if (existPersonalOrder) {
      throw new NotFoundException(ExceptionMessage.OrderExist)
    }

    if (initiator._id.toString() === userId) {
      throw new BadRequestException(ExceptionMessage.OrderForYourself);
    }

    const personalOrderEntity = new PersonalOrderEntity({
      user: userId,
      initiator: initiator._id,
      orderStatus: OrderStatus.Pending
    });

    await this.notifyService.create({
      user: userId,
      message: `${initiator.name} invites you to a personal training`
    });

    return this.personalOrderRepository.create(personalOrderEntity);
  }

  /** Изменение статуса заявки  */
  public async update(user: User, initiator: string, status: string) {
    const existPersonalOrder = await this.personalOrderRepository.show(user._id, initiator);
    if (!existPersonalOrder) {
      throw new NotFoundException(ExceptionMessage.OrderNotExist)
    }

    if (user._id.toString() !== existPersonalOrder.user.toString()) {
      throw new BadRequestException(ExceptionMessage.CannotChangeStatus);
    }

    if (existPersonalOrder.orderStatus === status) {
      throw new ConflictException(ExceptionMessage.CannotChangeStatus)
    }

    const orderEntity = new PersonalOrderEntity({
      ...existPersonalOrder,
      orderStatus: status
    });

    return this.personalOrderRepository.update(existPersonalOrder._id, orderEntity);
  }

  /** Список заявок */
  public async index(userId: string) {
    return this.personalOrderRepository.index(userId);
  }
}
