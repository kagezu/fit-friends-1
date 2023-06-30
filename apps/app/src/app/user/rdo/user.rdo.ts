import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

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
  @Transform(({ obj }) => obj.avatar.path)
  avatar: string;

  @ApiProperty({
    description: 'Пол пользователя.Одно из трёх значений: женский, мужской и неважно.',
    example: 'неважно'
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
    description: 'Роль пользователя.Доступные роли тренер и пользователь.',
    example: 'тренер'
  })
  @Expose()
  role: string;

  @ApiProperty({
    description: 'Текст с общей информацией.'
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'Одна из станций: «Пионерская», «Петроградская», «Удельная», «Звёздная», «Спортивная».',
    example: 'Звёздная'
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
    description: 'Уровень физической подготовки пользователя.Допустимые значения: новичок, любитель, профессионал.',
    example: 'любитель'
  })
  @Expose()
  trainingLevel: string;

  @ApiProperty({
    description: 'Тип тренировок.Допустимые значения: йога, бег, бокс, стрейчинг, кроссфит, аэробика, пилатес',
    example: 'Звёздная'
  })
  @Expose()
  trainingTypes: string[];


  @ApiProperty({
    description: 'Время на тренировку.',
    example: '30-50 мин'
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
  // @Transform(({ obj }) => obj.certificate.path)
  certificate: any;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    example: 'certificate.pdf',
  })
  @Expose()
  meritsOfCoach?: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    example: 'false'
  })
  @Expose()
  readyForIndividualTraining: boolean;
}
