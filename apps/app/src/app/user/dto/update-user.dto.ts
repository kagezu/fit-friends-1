import { IsArray, IsBoolean, IsEnum, IsISO8601, IsIn, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, TrainingLevel, TrainingType, userBackgrounds, intervals, locations } from '@fit-friends-1/shared/app-types';
import { Transform } from 'class-transformer';
import { UserMessage, UserValidate } from '../../auth/auth.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
    required: false,
    minLength: UserValidate.minLengthName,
    maxLength: UserValidate.maxLengthName
  })
  @IsString()
  @MinLength(UserValidate.minLengthName)
  @MaxLength(UserValidate.maxLengthName)
  @Matches('^([а-яё ]+|[a-z ]+)$', 'i', { message: UserMessage.NameNotValid })
  @IsOptional()
  name: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  certificate: string[];

  @ApiProperty({
    description: 'Пол пользователя.Одно из трёх значений: женский, мужской и неважно.',
    example: 'неважно',
    enum: Gender,
    required: false
  })
  @IsString()
  @IsEnum(Gender)
  @IsOptional()
  gender: string;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1981-03-12',
    required: false
  })
  @IsISO8601()
  @IsOptional()
  birthday: Date;

  @ApiProperty({
    description: 'Текст с общей информацией.',
    required: false,
    minLength: UserValidate.minLengthDescription,
    maxLength: UserValidate.maxLengthDescription
  })
  @IsString()
  @MinLength(UserValidate.minLengthDescription)
  @MaxLength(UserValidate.maxLengthDescription)
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Одна из станций.',
    example: 'Звёздная',
    enum: locations,
    required: false
  })
  @IsString()
  @IsIn(locations)
  @IsOptional()
  location: string;

  @ApiProperty({
    description: 'Фоновая картинка для карточки пользователя.',
    example: 'training-1.png',
    required: false
  })
  @IsString()
  @IsIn(userBackgrounds)
  @IsOptional()
  background: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: 'любитель',
    enum: TrainingLevel,
    required: false
  })
  @IsString()
  @IsEnum(TrainingLevel)
  @IsOptional()
  trainingLevel: string;

  @ApiProperty({
    description: 'Тип тренировок.',
    example: 'бег, бокс',
    type: String,
    enum: TrainingType,
    required: false
  })
  @Transform(({ obj }) => obj.trainingTypes.split(','))
  @IsArray()
  @IsEnum(TrainingType, {
    each: true,
    message: 'trainingTypes Необходимо выбрать хотябы одно'
  })
  @IsOptional()
  trainingTypes: string[];

  @ApiProperty({
    description: 'Время на тренировку.',
    example: '30-50 мин',
    enum: intervals,
    required: false
  })
  @IsString()
  @IsIn(intervals)
  @IsOptional()
  interval: string;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: '2000',
    required: false,
    minimum: UserValidate.minCaloriesToBurn,
    maximum: UserValidate.maxCaloriesToBurn
  })
  @Transform(({ obj }) => +obj.caloriesToBurn)
  @IsInt()
  @Min(UserValidate.minCaloriesToBurn, { message: `caloriesToBurn: ${UserMessage.ValueTooLittle}` })
  @Max(UserValidate.maxCaloriesToBurn, { message: `caloriesToBurn: ${UserMessage.ValueTooBig}` })
  @IsOptional()
  caloriesToBurn: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    example: '1000',
    required: false,
    minimum: UserValidate.minCaloriesPerDay,
    maximum: UserValidate.maxCaloriesPerDay
  })
  @Transform(({ obj }) => +obj.caloriesPerDay)
  @IsInt()
  @Min(UserValidate.minCaloriesPerDay, { message: `caloriesPerDay: ${UserMessage.ValueTooLittle}` })
  @Max(UserValidate.maxCaloriesPerDay, { message: `caloriesPerDay: ${UserMessage.ValueTooBig}` })
  @IsOptional()
  caloriesPerDay: number;

  @ApiProperty({
    description: 'Готовность к тренировке.',
    example: 'true',
    required: false
  })
  @Transform(({ obj }) => obj.readyForTraining === 'true')
  @IsBoolean()
  @IsOptional()
  readyForTraining: boolean;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    example: 'certificate.pdf',
    required: false,
    minLength: UserValidate.minLengthMeritsOfCoach,
    maxLength: UserValidate.maxLengthMeritsOfCoach
  })
  @IsString()
  @MinLength(UserValidate.minLengthMeritsOfCoach)
  @MaxLength(UserValidate.maxLengthMeritsOfCoach)
  @IsOptional()
  resume?: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    example: 'false',
    required: false
  })
  @Transform(({ obj }) => obj.readyForIndividualTraining === 'true')
  @IsBoolean()
  @IsOptional()
  readyForIndividualTraining: boolean;
}
