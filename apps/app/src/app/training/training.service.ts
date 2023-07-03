import { Injectable } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { FileService } from '../file/file.service';
import { TrainingCreateDto } from './dto/training-create.dto';

@Injectable()
export class TrainingService {
  constructor(
    private readonly fileService: FileService,
    private readonly trainingRepository: TrainingRepository,
  ) { }

  /** Информация о тренировке */
  public async show(id: string) {
    return this.trainingRepository.findById(id);
  }

  /** Создание новой тренировки */
  public async create(coachId: string, dto: TrainingCreateDto, video: Express.Multer.File) {
    const file = await this.fileService.save(video);
    const training = {
      ...dto,
      rating: 0,
      background: '',
      coachId,
      demoVideo: file._id
    };
    const trainingEntity = new TrainingEntity(training);

    return this.trainingRepository.create(trainingEntity);
  }

  /** Список пользователей 
  public async index(query: TrainingQuery) {
    const TrainingQuery = plainToInstance(
      TrainingQuery,
      query,
      { enableImplicitConversion: true });
    return this.TrainingRepository.index(TrainingQuery);
  }
*/

  /** Обновление информации о пользователе 
  public async update(TrainingEntity: TrainingEntity, dto: UpdateTrainingDto, files: TrainingFiles) {
    if (dto.trainingTypes) {
      dto.trainingTypes = Array.from(new Set((dto.trainingTypes as unknown as string).split(','))).slice(0, MAX_TRAINING_TYPES);
    }
    Object.assign(TrainingEntity, dto);

    if (files?.avatar) {
      const document = await this.fileService.save(files.avatar[0]);
      TrainingEntity.avatar = document._id;
    }

    if (files?.certificate && TrainingEntity.role === TrainingRole.Coach) {
      const document = await this.fileService.save(files.certificate[0]);
      TrainingEntity.certificate = document._id;
    }

    return this.TrainingRepository.update(TrainingEntity._id, TrainingEntity);
  }
*/
}
