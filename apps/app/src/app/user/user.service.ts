import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserQuery } from './query/user.query';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  /** Информация о пользователе */
  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  /** Список пользователей */
  public async index(query: UserQuery) {
    const userQuery = plainToInstance(
      UserQuery,
      query,
      { enableImplicitConversion: true });
    return this.userRepository.index(userQuery);
  }
}
