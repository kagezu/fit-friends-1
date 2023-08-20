import { Injectable, NotFoundException } from '@nestjs/common';
import { UserBalanceRepository } from './user-balance.repository';
import { TrainingService } from '../training/training.service';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { UserRepository } from '../user/user.repository';

enum ExceptionMessage {
  TrainingNotFound = 'Training not found.',
  UnauthorizedUser = 'To change the balance you need to be the creator of the workout.',
  UserNotFound = 'User not found.',
  EmptyBalance = 'Nothing to write off.'
}

@Injectable()
export class UserBalanceService {
  constructor(
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly userRepository: UserRepository,
    private readonly trainingService: TrainingService,
  ) { }

  /** Поступление */
  public async increase(userId: string, dto: UpdateUserBalanceDto) {
    const { training, count } = dto;
    const existTraining = await this.trainingService.show(training);
    if (!existTraining) {
      throw new NotFoundException(ExceptionMessage.TrainingNotFound);
    }

    const existUserBalance = await this.userBalanceRepository.show(userId, training);
    if (existUserBalance) {
      await this.userBalanceRepository.update({
        ...dto,
        userId,
        count: existUserBalance.count + count
      });
      return this.userBalanceRepository.show(userId, training);
    }

    const existUser = this.userRepository.findById(userId);
    if (!existUser) {
      throw new NotFoundException(ExceptionMessage.UserNotFound);
    }

    await this.userBalanceRepository.create({ ...dto, userId });
    return await this.userBalanceRepository.show(userId, training);
  }

  /** Списание  */
  public async decrease(id: string, dto: UpdateUserBalanceDto) {
    const { training, count } = dto;
    const existTraining = await this.trainingService.show(training);
    if (!existTraining) {
      throw new NotFoundException(ExceptionMessage.TrainingNotFound);
    }

    const existUserBalance = await this.userBalanceRepository.show(id, training);
    if (!existUserBalance) {
      throw new NotFoundException(ExceptionMessage.EmptyBalance);
    }

    if (existUserBalance.count < count) {
      existUserBalance.count = count;
    }

    await this.userBalanceRepository.update({
      ...dto,
      userId: id,
      count: existUserBalance.count - count
    });
    return this.userBalanceRepository.show(id, training);
  }

  /** Запрос баланса */
  public async index(userId: string) {
    return this.userBalanceRepository.index(userId);
  }

  /** Запрос баланса по id */
  public async show(userId: string, training: string) {
    return this.userBalanceRepository.show(userId, training);
  }
}
