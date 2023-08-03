import { Gender, TrainingLevel, TrainingType, UserRole, intervals, locations } from '@fit-friends-1/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { UploadedFileRdo } from '../../file/rdo/uploaded-file.rdo';

export class UserRdo {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Уникальный адрес электронной почты',
    example: 'user@user.ru',
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'ivan.jpg',
  })
  @Expose()
  @Transform(({ obj }) => obj.avatar?.path)
  avatar: string;

  @ApiProperty({
    description: 'Пол пользователя.',
    example: 'неважно',
    enum: Gender
  })
  @Expose()
  gender: string;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1981-03-12',
  })
  @Expose()
  birthday?: Date;

  @ApiProperty({
    description: 'Роль пользователя.',
    example: 'тренер',
    enum: UserRole
  })
  @Expose()
  role: string;

  @ApiProperty({
    description: 'Текст с общей информацией.'
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Одна из станций.',
    example: 'Звёздная',
    enum: locations
  })
  @Expose()
  location: string;

  @ApiProperty({
    description: 'Фоновая картинка для карточки пользователя.',
    example: 'training-1.png'
  })
  @Expose()
  background: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: 'любитель',
    enum: TrainingLevel
  })
  @Expose()
  trainingLevel: string;

  @ApiProperty({
    description: 'Тип тренировок.',
    example: '["бег", "бокс"]',
    enum: [TrainingType]
  })
  @Expose()
  trainingTypes: string[];


  @ApiProperty({
    description: 'Время на тренировку.',
    example: '30-50 мин',
    enum: intervals
  })
  @Expose()
  interval: string;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: '2000'
  })
  @Expose()
  caloriesToBurn: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    example: '1000'
  })
  @Expose()
  caloriesPerDay: number;

  @ApiProperty({
    description: 'Готовность к тренировке.',
    example: 'true'
  })
  @Expose()
  readyForTraining: boolean;


  @ApiProperty({
    description: 'Сертификат тренера, pdf-файл.',
    example: 'certificate.pdf',
  })
  @Expose()
  @Transform(({ obj }) => obj.certificate?.map(({ _id, path }) => ({ id: _id.toString(), path })))
  certificate: UploadedFileRdo[];

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.'
  })
  @Expose()
  resume?: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    example: 'false'
  })
  @Expose()
  readyForIndividualTraining: boolean;

  @ApiProperty({
    description: 'Дата регистрации',
    example: '10.04.2023'
  })
  @Expose()
  createdAt: Date;
}
