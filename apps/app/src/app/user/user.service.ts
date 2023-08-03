import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserQuery } from './query/user.query';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFiles, UserRole } from '@fit-friends-1/shared/app-types';
import { MAX_TRAINING_TYPES } from '../auth/auth.constant';
import { UserEntity } from './user.entity';
import { FileService } from '../file/file.service';
import { File } from '@fit-friends-1/shared/app-types';

const USER_NOT_EXIST_MESSAGE = 'User not exist';

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
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(USER_NOT_EXIST_MESSAGE);
    }
    return new UserEntity(existUser);
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

    if (dto.certificate) {
      dto.certificate = Array.from(new Set((dto.certificate as unknown as string).split(',')));
    }

    if (userEntity.certificate) {
      userEntity.certificate = (userEntity.certificate as unknown as File[]).map(({ _id }) => _id.toString());
    }

    Object.assign(userEntity, dto);

    if (files?.avatar) {
      const document = await this.fileService.save(files.avatar[0]);
      userEntity.avatar = document._id;
    }

    if (files?.certificate && userEntity.role === UserRole.Coach) {
      const document = await this.fileService.save(files.certificate[0]);
      userEntity.certificate.push(document._id);
    }

    if (userEntity.avatar === '') {
      userEntity.avatar = null;
    }

    return this.userRepository.update(userEntity._id, userEntity);
  }

}
