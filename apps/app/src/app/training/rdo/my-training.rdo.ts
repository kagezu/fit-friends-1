import { ApiProperty } from '@nestjs/swagger';
import { Gender, TrainingLevel, TrainingType, intervals } from '@fit-friends-1/shared/app-types';
import { Expose, Transform } from 'class-transformer';
import { TrainingValidate } from '../training.const';

export class MyTrainingRdo {
  @ApiProperty({
    description: 'Идентификатор тренировки',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'Идентификатор тренера',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose()
  @Transform(({ obj }) => obj.coachId.toString())
  public coachId: string;

  @ApiProperty({
    description: 'Видео тренировки',
    example: 'training.mp4',
  })
  @Expose()
  @Transform(({ obj }) => obj.demoVideo.path)
  demoVideo: string;

  @ApiProperty({
    description: 'Рейтинг тренировки',
    example: '4.2',
  })
  @Expose()
  rating: number;

  @ApiProperty({
    description: 'Название тренировки',
    example: 'Разминка',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: 'любитель',
    enum: TrainingLevel
  })
  @Expose()
  trainingLevel: string;

  @ApiProperty({
    description: 'Тип тренировок.',
    example: 'бег',
    enum: TrainingType
  })
  @Expose()
  trainingType: string;

  @ApiProperty({
    description: 'Время на тренировку.',
    example: '30-50 мин',
    enum: intervals
  })
  @Expose()
  interval: string;

  @ApiProperty({
    description: 'Стоимость тренировки в рублях.',
    example: '1000',
    minimum: TrainingValidate.minPrice
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: '2000',
    minimum: TrainingValidate.minCaloriesToBurn,
    maximum: TrainingValidate.maxCaloriesToBurn
  })
  @Expose()
  caloriesToBurn: number;

  @ApiProperty({
    description: 'Описание тренировки.'
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'Пол пользователя для которого предназначена тренировка.',
    example: 'неважно',
    enum: Gender
  })
  @Expose()
  usersGender: string;

  @ApiProperty({
    description: 'Фоновое изображение.'
  })
  @Expose()
  background: string;

  @ApiProperty({
    description: 'Признак специального предложения.',
    example: 'true'
  })
  @Expose()
  specialOffer: boolean;

  @ApiProperty({
    description: 'Количество проданных тренировок.',
    example: '5',
  })
  @Expose()
  totalSale: number;

  @ApiProperty({
    description: 'Сумма проданных тренировок.'
  })
  @Expose()
  totalAmount: number;
}
