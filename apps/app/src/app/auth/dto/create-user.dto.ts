import { IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsIn, IsInt, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserMassage, UserValidate } from '../auth.constant';
import { Gender, TrainingLevel, TrainingType, UserRole, userBackgrounds, intervals } from '@fit-friends-1/shared/app-types';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @IsString({ message: UserMassage.ValueNotString })
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
  avatar: string;

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
  @IsString({ message: UserMassage.ValueNotString })
  @IsEnum(Gender)
  gender: string;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: UserMassage.BirthNotValid })
  birthday: Date;

  @ApiProperty({
    description: 'Роль пользователя.Доступные роли тренер и пользователь.',
    example: 'тренер'
  })
  @IsString({ message: UserMassage.ValueNotString })
  @IsEnum(UserRole)
  role: string;

  @ApiProperty({
    description: 'Текст с общей информацией.'
  })
  @IsString({ message: UserMassage.ValueNotString })
  @MinLength(UserValidate.minLengthDescription)
  @MaxLength(UserValidate.maxLengthDescription)
  description: string;

  @ApiProperty({
    description: 'Одна из станций: «Пионерская», «Петроградская», «Удельная», «Звёздная», «Спортивная».',
    example: 'Звёздная'
  })
  @IsString({ message: UserMassage.ValueNotString })
  @IsEnum(Location)
  location: string;

  @ApiProperty({
    description: 'Фоновая картинка для карточки пользователя.',
    example: 'training-1.png'
  })
  @IsString({ message: UserMassage.ValueNotString })
  @IsIn(userBackgrounds)
  background: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.Допустимые значения: новичок, любитель, профессионал.',
    example: 'любитель'
  })
  @IsString({ message: UserMassage.ValueNotString })
  @IsEnum(TrainingLevel)
  trainingLevel: string;

  @ApiProperty({
    description: 'Тип тренировок.Допустимые значения: йога, бег, бокс, стрейчинг, кроссфит, аэробика, пилатес',
    example: 'Звёздная'
  })
  @IsArray()
  @MaxLength(3, {
    each: true,
  })
  @IsEnum(TrainingType)
  trainingType: string[];


  @ApiProperty({
    description: 'Время на тренировку.',
    example: '30-50 мин'
  })
  @ValidateIf((obj) => obj.role === UserRole.User)
  @IsString({ message: UserMassage.ValueNotString })
  @IsIn(intervals)
  interval: string;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: '2000'
  })
  @ValidateIf((obj) => obj.role === UserRole.User)
  @IsInt({ message: UserMassage.ValueNotInt })
  @Min(UserValidate.minCaloriesToBurn, { message: UserMassage.ValueTooLittle })
  @Max(UserValidate.maxCaloriesToBurn, { message: UserMassage.ValueTooBig })
  caloriesToBurn: number;

  @ApiProperty({
    description: 'Количество калорий для траты в день.',
    example: '1000'
  })
  @ValidateIf((obj) => obj.role === UserRole.User)
  @IsInt({ message: UserMassage.ValueNotInt })
  @Min(UserValidate.minCaloriesPerDay, { message: UserMassage.ValueTooLittle })
  @Max(UserValidate.maxCaloriesPerDay, { message: UserMassage.ValueTooBig })
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
  @IsString({ message: UserMassage.ValueNotString })
  certificate: string;

  @ApiProperty({
    description: 'Текст с описанием заслуг тренера.',
    example: 'certificate.pdf',
  })
  @ValidateIf((obj) => obj.role === UserRole.Coach)
  @IsString({ message: UserMassage.ValueNotString })
  @MinLength(UserValidate.minLengthMeritsOfCoach)
  @MaxLength(UserValidate.maxLengthMeritsOfCoach)
  meritsOfCoach: string;

  @ApiProperty({
    description: 'Флаг готовности проводить индивидуальные тренировки.',
    example: 'false'
  })
  @ValidateIf((obj) => obj.role === UserRole.Coach)
  @IsBoolean()
  readyForIndividualTraining: boolean;
}
