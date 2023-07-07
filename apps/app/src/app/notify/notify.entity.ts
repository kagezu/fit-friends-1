import { Entity } from '@fit-friends-1/util/util-types';
import { Notify } from '@fit-friends-1/shared/app-types';

export class NotifyEntity implements Entity<NotifyEntity>, Notify {
  public _id?: string;
  public createdAt?: string;
  public user: string;
  public message: string;

  constructor(entity: Notify) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: Notify) {
    this._id = entity._id;
    this.createdAt = entity.createdAt;
    this.user = entity.user;
    this.message = entity.message;
  }

  public toObject(): NotifyEntity {
    return { ...this }
  }
}
