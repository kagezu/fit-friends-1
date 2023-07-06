import { Entity } from '@fit-friends-1/util/util-types';
import { UserBalance } from '@fit-friends-1/shared/app-types';

export class UserBalanceEntity implements Entity<UserBalanceEntity>, UserBalance {
  userId: string;
  training: string;
  count: number;

  constructor(entity: UserBalance) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: UserBalance) {
    this.userId = entity.userId;
    this.training = entity.training;
    this.count = entity.count;
  }

  public toObject(): UserBalanceEntity {
    return { ...this }
  }
}
