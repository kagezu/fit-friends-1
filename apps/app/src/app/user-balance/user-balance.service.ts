import { Injectable, NotFoundException } from '@nestjs/common';
import { UserBalanceRepository } from './user-balance.repository';
import { TrainingService } from '../training/training.service';

@Injectable()
export class UserBalanceService {
  constructor(
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly trainingService: TrainingService,
  ) { }

  /** Поступление */
  public async increase(userId: string, training: string, count: number) {
    const existTraining = await this.trainingService.show(training);
    if (!existTraining) {
      throw new NotFoundException('Training not found.');
    }

    const existUserBalance = await this.userBalanceRepository.check(userId, training);
    if (existUserBalance) {
      return this.userBalanceRepository.update({
        userId,
        training,
        count: existUserBalance.count + count
      });
    }
    return this.userBalanceRepository.create({
      userId,
      training,
      count: count
    });
  }

  /** Списание  */
  public async decrease(userId: string, training: string, count: number) {
    const existTraining = await this.trainingService.show(training);
    if (!existTraining) {
      throw new NotFoundException('Training not found.');
    }

    const existUserBalance = await this.userBalanceRepository.check(userId, training);
    if (!existUserBalance) {
      throw new NotFoundException('Nothing to write off');
    }
    if (existUserBalance.count < count) {
      count = existUserBalance.count;
    }

    return this.userBalanceRepository.update({
      userId,
      training,
      count: existUserBalance.count - count
    });
  }

  /** Запрос баланса */
  public async index(userId: string) {
    return this.userBalanceRepository.index(userId);
  }
}
