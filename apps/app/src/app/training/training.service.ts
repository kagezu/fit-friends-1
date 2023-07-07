import { BadRequestException, Injectable } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { FileService } from '../file/file.service';
import { TrainingCreateDto } from './dto/training-create.dto';
import { TrainingUpdateDto } from './dto/training-update.dto';
import { plainToInstance } from 'class-transformer';
import { TrainingQuery } from './query/trainer.query';
import { MailService } from '../mail/mail.service';

@Injectable()
export class TrainingService {
  constructor(
    private readonly fileService: FileService,
    private readonly trainingRepository: TrainingRepository,
    private readonly mailService: MailService,
  ) { }

  /** Информация о тренировке */
  public async show(id: string) {
    return this.trainingRepository.findById(id);
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
  public async update(trainingEntity: TrainingEntity, dto: TrainingUpdateDto, video: Express.Multer.File) {
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
}
