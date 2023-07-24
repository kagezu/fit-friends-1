import { IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsIn, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserMessage, UserValidate } from '../auth.constant';
import { Gender, TrainingLevel, TrainingType, UserRole, userBackgrounds, intervals, locations } from '@fit-friends-1/shared/app-types';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
    minLength: UserValidate.minLengthName,
    maxLength: UserValidate.maxLengthName
  })
  @IsString()
  @MinLength(UserValidate.minLengthName)
  @MaxLength(UserValidate.maxLengthName)
  @Matches('^([а-яё]+|[a-z]+)$', 'i', { message: UserMessage.NameNotValid })
  name: string;

  @ApiProperty({
    description: 'Уникальный адрес электронной почты',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: UserMessage.EmailNotValid })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456',
    minLength: UserValidate.minLengthPassword,
    maxLength: UserValidate.maxLengthPassword
  })
  @IsString()
  @MinLength(UserValidate.minLengthPassword)
  @MaxLength(UserValidate.maxLengthPassword)
  password: string;

  @ApiProperty({
    description: 'Пол пользователя.',
    example: 'неважно',
    enum: Gender
  })
  @IsString()
  @IsEnum(Gender)
  gender: string;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1981-03-12'
  })
  @IsISO8601({}, { message: UserMessage.BirthNotValid })
  @IsOptional()
  birthday?: Date;

  @ApiProperty({
    description: 'Роль пользователя.',
    example: 'тренер',
    enum: UserRole
  })
  @IsString()
  @IsEnum(UserRole)
  role: string;

  @ApiProperty({
    description: 'Текст с общей информацией.',
    minLength: UserValidate.minLengthDescription,
    maxLength: UserValidate.maxLengthDescription
  })
  @IsString()
  @MinLength(UserValidate.minLengthDescription)
  @MaxLength(UserValidate.maxLengthDescription)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Одна из станций.',
    example: 'Звёздная',
    enum: locations
  })
  @IsString()
  @IsIn(locations)
  location: string;

  @ApiProperty({
    description: 'Фоновая картинка для карточки пользователя.',
    example: 'training-1.png'
  })
  @IsString()
  @IsIn(userBackgrounds)
  @IsOptional()
  background: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.',
    example: 'любитель',
    enum: TrainingLevel
  })
  @IsString()
  @IsEnum(TrainingLevel)
  @IsOptional()
  trainingLevel: string;

  @ApiProperty({
    description: 'Тип тренировок.',
    example: 'бег,бокс',
    type: String,
    enum: TrainingType
  })
  @Transform(({ obj }) => obj.trainingTypes.split(','))
  @IsArray()
  @IsEnum(TrainingType, {
    each: true,
  })
  @IsOptional()
  trainingTypes: string[];

  @ApiProperty({
    description: 'Время на тренировку.',
    example: '30-50 мин',
    enum: intervals
  })
  @ValidateIf((obj) => obj.role === UserRole.User)
  @IsString()
  @IsIn(intervals)
  @IsOptional()
  interval: string;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: '2000',
    minimum: UserValidate.minCaloriesToBurn,
    maximum: UserValidate.maxCaloriesToBurn
  })
  @ValidateIf((obj) => obj.role === UserRole.User)
  @Transform(({ obj }) => +obj.caloriesToBurn)
  @IsInt()
  @Min(UserValidate.minCaloriesToBurn, { message: `caloriesToBurn: ${UserMessage.ValueTooLittle}` })
  @Max(UserValidate.maxCaloriesToBurn, { message: `caloriesToBurn: ${UserMessage.ValueTooBig}` })
  @IsOptional()
  caloriesToBurn: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    example: '1000',
    minimum: UserValidate.minCaloriesPerDay,
    maximum: UserValidate.maxCaloriesPerDay
  })
  @ValidateIf((obj) => obj.role === UserRole.User)
  @Transform(({ obj }) => +obj.caloriesPerDay)
  @IsInt()
  @Min(UserValidate.minCaloriesPerDay, { message: `caloriesPerDay: ${UserMessage.ValueTooLittle}` })
  @Max(UserValidate.maxCaloriesPerDay, { message: `caloriesPerDay: ${UserMessage.ValueTooBig}` })
  @IsOptional()
  caloriesPerDay: number;

  @ApiProperty({
    description: 'Готовность к тренировке.',
    example: 'true'
  })
  @Transform(({ obj }) => obj.readyForTraining === 'true')
  @ValidateIf((obj) => obj.role === UserRole.User)
  @IsBoolean()
  @IsOptional()
  readyForTraining: boolean;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    minLength: UserValidate.minLengthMeritsOfCoach,
    maxLength: UserValidate.maxLengthMeritsOfCoach
  })
  @ValidateIf((obj) => obj.role === UserRole.Coach)
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
  @ValidateIf((obj) => obj.role === UserRole.Coach)
  @IsBoolean()
  @IsOptional()
  readyForIndividualTraining: boolean;
}
