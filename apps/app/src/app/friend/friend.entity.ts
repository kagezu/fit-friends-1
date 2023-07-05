import { Entity } from '@fit-friends-1/util/util-types';
import { Friend } from '@fit-friends-1/shared/app-types';

export class FriendEntity implements Entity<FriendEntity>, Friend {
  public userId: string;
  public friend: string;

  constructor(entity: Friend) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: Friend) {
    this.userId = entity.userId;
    this.friend = entity.friend;
  }

  public toObject(): FriendEntity {
    return { ...this }
  }
}
