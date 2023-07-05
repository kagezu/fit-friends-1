import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { FriendRepository } from './friend.repository';
import { FriendEntity } from './friend.entity';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRepository,
  ) { }

  /** Добавление в друзья */
  public async create(userId: string, friend: string) {
    const existFriend = await this.friendRepository.check(userId, friend);
    if (existFriend) {
      throw new ConflictException('Friend exist');
    }
    const friendEntity = new FriendEntity({ userId, friend });
    return this.friendRepository.create(friendEntity);
  }

  /** Удаление друга  */
  public async destroy(userId: string, friend: string) {
    const existFriend = await this.friendRepository.check(userId, friend);
    if (!existFriend) {
      throw new NotFoundException('Friend not exist.')
    }
    return this.friendRepository.destroy(userId, friend);
  }

  /** Список друзей */
  public async index(userId: string) {
    return this.friendRepository.index(userId);
  }
}
