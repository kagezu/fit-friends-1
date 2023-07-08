import { Entity } from '@fit-friends-1/util/util-types';
import { PersonalOrder } from '@fit-friends-1/shared/app-types';

export class PersonalOrderEntity implements Entity<PersonalOrderEntity>, PersonalOrder {
  public _id?: string;
  public initiator: string;
  public user: string;
  public createdAt: string;
  public updatedAt: string;
  public orderStatus: string;

  constructor(entity: PersonalOrder) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: PersonalOrder) {
    this._id = entity._id;
    this.initiator = entity.initiator;
    this.user = entity.user;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.orderStatus = entity.orderStatus;
  }

  public toObject(): PersonalOrderEntity {
    return { ...this }
  }
}
