import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { plainToInstance } from 'class-transformer';
import { CoachOrderQuery } from './query/coach-order.query';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
  ) { }

  /** Информация о заказе
  public async show(id: string) {
    return this.OrderRepository.findById(id);
  } */

  /** Создание новой тренировки
  public async create(coachId: string, dto: OrderCreateDto, video: Express.Multer.File) {
    if (!video) {
      throw new BadRequestException('Video file is request');
    }
    const file = await this.fileService.save(video);
    const Order = {
      ...dto,
      rating: 0,
      background: '',
      coachId,
      demoVideo: file._id
    };
    const OrderEntity = new OrderEntity(Order);

    return this.OrderRepository.create(OrderEntity);
  } */

  /** Редактирование тренировки
  public async update(OrderEntity: OrderEntity, dto: OrderUpdateDto, video: Express.Multer.File) {
    Object.assign(OrderEntity, dto);
    if (video) {
      const file = await this.fileService.save(video);
      OrderEntity.demoVideo = file._id;
    }

    return this.OrderRepository.update(OrderEntity._id, OrderEntity);
  } */

  /** Список заказов тренера */
  public async list(coachId: string, query: CoachOrderQuery) {
    const orderQuery = plainToInstance(
      CoachOrderQuery,
      query,
      { enableImplicitConversion: true });
    return this.orderRepository.list(coachId, orderQuery);
  }
}
