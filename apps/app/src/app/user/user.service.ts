import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  /** Информация о пользователе*/
  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }
}
