import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { FileService } from '../file/file.service';
import { TrainingCreateDto } from './dto/training-create.dto';
import { TrainingUpdateDto } from './dto/training-update.dto';
import { plainToInstance } from 'class-transformer';
import { MailService } from '../mail/mail.service';
import { TrainingCatalogQuery } from './query/trainer-catalog.query';
import { mockData } from '@fit-friends-1/shared/mock-data';
import { getRandomItem } from '@fit-friends-1/util/util-core';

enum ExceptionMessage {
  NotFound = 'Training not exist',
  VideoIsRequest = 'video file is request',
  ТoEditingPermissions = 'Тo editing permissions'
}

@Injectable()
export class TrainingService {
  constructor(
    private readonly fileService: FileService,
    private readonly trainingRepository: TrainingRepository,
    private readonly mailService: MailService,
  ) { }

  /** Информация о тренировке */
  public async show(id: string) {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new NotFoundException(ExceptionMessage.NotFound);
    }
    return existTraining;
  }

  /** Создание новой тренировки */
  public async create(coachId: string, dto: TrainingCreateDto, video: Express.Multer.File) {
    if (!video) {
      throw new BadRequestException(ExceptionMessage.VideoIsRequest);
    }
    const file = await this.fileService.save(video);
    const training = {
      ...dto,
      rating: 0,
      background: getRandomItem(mockData.backgrounds),
      coachId,
      demoVideo: file._id,
      totalSale: 0,
      totalAmount: 0
    };
    const trainingEntity = new TrainingEntity(training);
    const newTraining = await this.trainingRepository.create(trainingEntity);
    await this.mailService.addNotify(coachId, newTraining._id.toString());
    return newTraining;
  }

  /** Редактирование тренировки */
  public async update(trainingId: string, coachId: string, dto: TrainingUpdateDto, video: Express.Multer.File) {
    const existTraining = await this.trainingRepository.check(trainingId);
    const trainingEntity = new TrainingEntity(existTraining);

    if (existTraining.coachId.toString() !== coachId) {
      throw new UnauthorizedException(ExceptionMessage.ТoEditingPermissions);
    }

    Object.assign(trainingEntity, dto);
    if (video) {
      const file = await this.fileService.save(video);
      trainingEntity.demoVideo = file._id;
    }
    return this.trainingRepository.update(trainingEntity._id, trainingEntity);
  }

  /** Список тренировок тренера */
  public async list(coachId: string, query: TrainingCatalogQuery) {
    const trainingQuery = plainToInstance(
      TrainingCatalogQuery,
      { ...query, coachId},
      { enableImplicitConversion: true });
    return this.trainingRepository.index(trainingQuery);
  }

  /** Список тренировок */
  public async index(query: TrainingCatalogQuery) {
    const trainingQuery = plainToInstance(
      TrainingCatalogQuery,
      query,
      { enableImplicitConversion: true });
    return this.trainingRepository.index(trainingQuery);
  }
}
