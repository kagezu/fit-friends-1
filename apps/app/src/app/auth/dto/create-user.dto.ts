import { IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsIn, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserMassage, UserValidate } from '../auth.constant';
import { Gender, TrainingLevel, TrainingType, UserRole, userBackgrounds, intervals, locations } from '@fit-friends-1/shared/app-types';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @IsString()
  @MinLength(UserValidate.minLengthName)
  @MaxLength(UserValidate.maxLengthName)
  @Matches('^([а-яё]+|[a-z]+)$', 'i', { message: UserMassage.NameNotValid })
  name: string;

  @ApiProperty({
    description: 'Уникальный адрес электронной почты',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: UserMassage.EmailNotValid })
  email: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'ivan.jpg',
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456'
  })
  @IsString()
  @MinLength(UserValidate.minLengthPassword)
  @MaxLength(UserValidate.maxLengthPassword)
  password: string;

  @ApiProperty({
    description: 'Пол пользователя.Одно из трёх значений: женский, мужской и неважно.',
    example: 'неважно'
  })
  @IsString()
  @IsEnum(Gender)
  gender: string;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: UserMassage.BirthNotValid })
  @IsOptional()
  birthday?: Date;

  @ApiProperty({
    description: 'Роль пользователя.Доступные роли тренер и пользователь.',
    example: 'тренер'
  })
  @IsString()
  @IsEnum(UserRole)
  role: string;

  @ApiProperty({
    description: 'Текст с общей информацией.'
  })
  @IsString()
  @MinLength(UserValidate.minLengthDescription)
  @MaxLength(UserValidate.maxLengthDescription)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Одна из станций: «Пионерская», «Петроградская», «Удельная», «Звёздная», «Спортивная».',
    example: 'Звёздная'
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
  background: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.Допустимые значения: новичок, любитель, профессионал.',
    example: 'любитель'
  })
  @IsString()
  @IsEnum(TrainingLevel)
  trainingLevel: string;

  @ApiProperty({
    description: 'Тип тренировок.Допустимые значения: йога, бег, бокс, стрейчинг, кроссфит, аэробика, пилатес',
    example: 'Звёздная'
  })
  @IsArray()
  @IsEnum(TrainingType, {
    each: true,
  })
  trainingTypes: string[];


  @ApiProperty({
    description: 'Время на тренировку.',
    example: '30-50 мин'
  })
  @ValidateIf((obj) => obj.role === UserRole.User)
  @IsString()
  @IsIn(intervals)
  interval: string;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: '2000'
  })
  @ValidateIf((obj) => obj.role === UserRole.User)
  @IsInt()
  @Min(UserValidate.minCaloriesToBurn, { message: `caloriesToBurn: ${UserMassage.ValueTooLittle}` })
  @Max(UserValidate.maxCaloriesToBurn, { message: `caloriesToBurn: ${UserMassage.ValueTooBig}` })
  caloriesToBurn: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    example: '1000'
  })
  @ValidateIf((obj) => obj.role === UserRole.User)
  @IsInt()
  @Min(UserValidate.minCaloriesPerDay, { message: `caloriesPerDay: ${UserMassage.ValueTooLittle}` })
  @Max(UserValidate.maxCaloriesPerDay, { message: `caloriesPerDay: ${UserMassage.ValueTooBig}` })
  caloriesPerDay: number;

  @ApiProperty({
    description: 'Готовность к тренировке.',
    example: 'true'
  })
  @ValidateIf((obj) => obj.role === UserRole.User)
  @IsBoolean()
  readyForTraining: boolean;


  @ApiProperty({
    description: 'Сертификат тренера, pdf-файл.',
    example: 'certificate.pdf',
  })
  @ValidateIf((obj) => obj.role === UserRole.Coach)
  @IsString()
  certificate: string;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    example: 'certificate.pdf',
  })
  @ValidateIf((obj) => obj.role === UserRole.Coach)
  @IsString()
  @MinLength(UserValidate.minLengthMeritsOfCoach)
  @MaxLength(UserValidate.maxLengthMeritsOfCoach)
  @IsOptional()
  meritsOfCoach?: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    example: 'false'
  })
  @ValidateIf((obj) => obj.role === UserRole.Coach)
  @IsBoolean()
  readyForIndividualTraining: boolean;
}
