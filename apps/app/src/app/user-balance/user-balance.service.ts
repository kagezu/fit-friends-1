import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
  public async increase(coachId: string, dto: UpdateUserBalanceDto) {
    const { userId, training, count } = dto;
    const existTraining = await this.trainingService.show(training);
    if (!existTraining) {
      throw new NotFoundException(ExceptionMessage.TrainingNotFound);
    }

    if (existTraining.coachId.toString() !== coachId.toString()) {
      throw new UnauthorizedException(ExceptionMessage.UnauthorizedUser);
    }

    const existUserBalance = await this.userBalanceRepository.show(userId, training);
    if (existUserBalance) {
      await this.userBalanceRepository.update({
        ...dto,
        count: existUserBalance.count + count
      });
      return this.userBalanceRepository.show(userId, training);
    }

    const existUser = this.userRepository.findById(userId);
    if (!existUser) {
      throw new NotFoundException(ExceptionMessage.UserNotFound);
    }

    return this.userBalanceRepository.create(dto);
  }

  /** Списание  */
  public async decrease(coachId: string, dto: UpdateUserBalanceDto) {
    const { userId, training, count } = dto;
    const existTraining = await this.trainingService.show(training);
    if (!existTraining) {
      throw new NotFoundException(ExceptionMessage.TrainingNotFound);
    }

    if (existTraining.coachId.toString() !== coachId.toString()) {
      throw new UnauthorizedException(ExceptionMessage.UnauthorizedUser);
    }

    const existUserBalance = await this.userBalanceRepository.show(userId, training);
    if (!existUserBalance) {
      throw new NotFoundException(ExceptionMessage.EmptyBalance);
    }

    if (existUserBalance.count < count) {
      existUserBalance.count = count;
    }

    await this.userBalanceRepository.update({
      ...dto,
      count: existUserBalance.count - count
    });
    return this.userBalanceRepository.show(userId, training);
  }

  /** Запрос баланса */
  public async index(userId: string) {
    return this.userBalanceRepository.index(userId);
  }
}
