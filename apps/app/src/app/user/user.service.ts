import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserQuery } from './query/user.query';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFiles, UserRole } from '@fit-friends-1/shared/app-types';
import { MAX_TRAINING_TYPES } from '../auth/auth.constant';
import { UserEntity } from './user.entity';
import { FileService } from '../file/file.service';

@Injectable()
export class UserService {
  constructor(
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
  ) { }

  /** Информация о пользователе */
  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  /** Информация о пользователе */
  public async getUserEntity(email: string) {
    return new UserEntity(await this.userRepository.findByEmail(email));
  }

  /** Список пользователей */
  public async index(query: UserQuery) {
    const userQuery = plainToInstance(
      UserQuery,
      query,
      { enableImplicitConversion: true });
    return this.userRepository.index(userQuery);
  }

  /** Обновление информации о пользователе */
  public async update(userEntity: UserEntity, dto: UpdateUserDto, files: UserFiles) {
    if (dto.trainingTypes) {
      dto.trainingTypes = Array.from(new Set((dto.trainingTypes as unknown as string).split(','))).slice(0, MAX_TRAINING_TYPES);
    }
    Object.assign(userEntity, dto);

    if (files?.avatar) {
      const document = await this.fileService.save(files.avatar[0]);
      userEntity.avatar = document._id;
    }

    if (files?.certificate && userEntity.role === UserRole.Coach) {
      const document = await this.fileService.save(files.certificate[0]);
      userEntity.certificate = document._id;
    }

    return this.userRepository.update(userEntity._id, userEntity);
  }

}
