import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { FriendRepository } from './friend.repository';
import { FriendEntity } from './friend.entity';
import { NotifyService } from '../notify/notify.service';
import { User } from '@fit-friends-1/shared/app-types';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRepository,
    private readonly notifyService: NotifyService,
  ) { }

  /** Добавление в друзья */
  public async create(user: User, friend: string) {
    const existFriend = await this.friendRepository.check(user._id, friend);
    if (existFriend) {
      throw new ConflictException('Friend exist');
    }
    if (user._id.toString() === friend) {
      throw new BadRequestException("You can't be your own friend");
    }
    await this.notifyService.create({
      user: friend,
      message: `${user.name} added you as a friend`
    });
    const friendEntity = new FriendEntity({ userId: user._id, friend });
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
