import { Entity } from '@fit-friends-1/util/util-types';
import { Order } from '@fit-friends-1/shared/app-types';

export class OrderEntity implements Entity<OrderEntity>, Order {
  public purchaseType: string;
  public training: string;
  public price: number;
  public count: number;
  public orderPrice: number;
  public paymentMethod: string;
  public createdAt?: string;

  constructor(entity: Order) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: Order) {
    this.purchaseType = entity.purchaseType;
    this.training = entity.training;
    this.price = entity.price;
    this.count = entity.count;
    this.orderPrice = entity.orderPrice;
    this.paymentMethod = entity.paymentMethod;
    this.createdAt = entity.createdAt;
  }

  public toObject(): OrderEntity {
    return { ...this }
  }
}
