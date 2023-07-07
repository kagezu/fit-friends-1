import { Injectable } from '@nestjs/common';
import { NotifyRepository } from './notify.repository';
import { NotifyEntity } from './notify.entity';
import { Notify } from '@fit-friends-1/shared/app-types';

@Injectable()
export class NotifyService {
  constructor(
    private readonly notifyRepository: NotifyRepository,
  ) { }

  /** Добавление оповещения */
  public async create(notify: Notify) {
    const notifyEntity = new NotifyEntity(notify);
    return this.notifyRepository.create(notifyEntity);
  }

  /** Удаление оповещение  */
  public async destroy(user: string, id: string) {
    return this.notifyRepository.destroy(user, id);
  }

  /** Список оповещений */
  public async index(user: string) {
    return this.notifyRepository.index(user);
  }
}
