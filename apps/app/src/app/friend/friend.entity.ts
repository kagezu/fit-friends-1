import { Entity } from '@fit-friends-1/util/util-types';
import { Friend } from '@fit-friends-1/shared/app-types';

export class FriendEntity implements Entity<FriendEntity>, Friend {
  public userId: string;
  public friendId: string;

  constructor(entity: Friend) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: Friend) {
    this.userId = entity.userId;
    this.friendId = entity.friendId;
  }

  public toObject(): FriendEntity {
    return { ...this }
  }
}
