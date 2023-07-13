import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { FileService } from '../file/file.service';
import { TrainingCreateDto } from './dto/training-create.dto';
import { TrainingUpdateDto } from './dto/training-update.dto';
import { plainToInstance } from 'class-transformer';
import { TrainingQuery } from './query/trainer.query';
import { MailService } from '../mail/mail.service';
import { TrainingCatalogQuery } from './query/trainer-catalog.query';

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
      throw new NotFoundException('Training not exist');
    }
    return existTraining;
  }

  /** Создание новой тренировки */
  public async create(coachId: string, dto: TrainingCreateDto, video: Express.Multer.File) {
    if (!video) {
      throw new BadRequestException('Video file is request');
    }
    const file = await this.fileService.save(video);
    const training = {
      ...dto,
      rating: 0,
      background: '',
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
    const existTraining = await this.show(trainingId);
    const trainingEntity = new TrainingEntity(existTraining);

    if (existTraining.coachId.toString() !== coachId) {
      throw new UnauthorizedException('Тo editing permissions');
    }

    Object.assign(trainingEntity, dto);
    if (video) {
      const file = await this.fileService.save(video);
      trainingEntity.demoVideo = file._id;
    }
    return this.trainingRepository.update(trainingEntity._id, trainingEntity);
  }

  /** Список тренировок тренера */
  public async list(coachId: string, query: TrainingQuery) {
    const trainingQuery = plainToInstance(
      TrainingQuery,
      query,
      { enableImplicitConversion: true });
    return this.trainingRepository.list(coachId, trainingQuery);
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
