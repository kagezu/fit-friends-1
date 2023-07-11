import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PersonalOrderRepository } from './personal-order.repository';
import { PersonalOrderEntity } from './personal-order.entity';
import { OrderStatus, User } from '@fit-friends-1/shared/app-types';
import { UserService } from '../user/user.service';
import { NotifyService } from '../notify/notify.service';

@Injectable()
export class PersonalOrderService {
  constructor(
    private readonly personalOrderRepository: PersonalOrderRepository,
    private readonly userService: UserService,
    private readonly notifyService: NotifyService
  ) { }

  /** Создание заявки на персональную/совместную тренировку */
  public async create(initiator: User, userId: string) {
    const existUser = this.userService.getUser(userId);
    if (!existUser) {
      throw new NotFoundException('User not exist.');
    }

    if (initiator._id.toString() === userId) {
      throw new BadRequestException('You cannot create an order for yourself.');
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
  public async update(user: User, id: string, status: string) {
    const existPersonalOrder = await this.personalOrderRepository.show(id);
    if (!existPersonalOrder) {
      throw new NotFoundException('Personal order not exist.')
    }

    if (user._id.toString() !== existPersonalOrder.user.toString()) {
      throw new BadRequestException('You cannot change the status of this order');
    }

    if (existPersonalOrder.orderStatus === status) {
      throw new ConflictException('Status not changed.')
    }

    const orderEntity = new PersonalOrderEntity({
      ...existPersonalOrder,
      orderStatus: status
    });

    return this.personalOrderRepository.update(id, orderEntity);
  }

  /** Список заявок */
  public async index(userId: string) {
    return this.personalOrderRepository.index(userId);
  }
}
