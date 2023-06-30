import { IsBoolean, IsEnum, IsIn, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, TrainingLevel, TrainingType, intervals } from '@fit-friends-1/shared/app-types';
import { Transform } from 'class-transformer';

enum TrainingValidate {
  minLengthTitle = 1,
  maxLengthTitle = 15,
  minLengthPrice = 0,
  minCaloriesToBurn = 1000,
  maxCaloriesToBurn = 5000,
  minLengthDescription = 10,
  maxLengthDescription = 140,

}

export class TrainingCreateDto {
  @ApiProperty({
    description: 'Название тренировки',
    example: 'Иван',
  })
  @IsString()
  @MinLength(TrainingValidate.minLengthTitle)
  @MaxLength(TrainingValidate.maxLengthTitle)
  title: string;

  @ApiProperty({
    description: 'Уровень физической подготовки пользователя.Допустимые значения: новичок, любитель, профессионал.',
    example: 'любитель'
  })
  @IsString()
  @IsEnum(TrainingLevel)
  trainingLevel: string;

  @ApiProperty({
    description: 'Тип тренировок.Допустимые значения: йога, бег, бокс, стрейчинг, кроссфит, аэробика, пилатес',
    example: 'бег, бокс'
  })
  @IsString()
  @IsEnum(TrainingType)
  trainingType: string;

  @ApiProperty({
    description: 'Время на тренировку.',
    example: '30-50 мин'
  })
  @IsString()
  @IsIn(intervals)
  interval: string;

  @ApiProperty({
    description: 'Стоимость тренировки в рублях.',
    example: '1000'
  })
  @Transform(({ obj }) => +obj.price)
  @IsInt()
  @MinLength(TrainingValidate.minLengthPrice)
  price: number;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: '2000'
  })
  @Transform(({ obj }) => +obj.caloriesToBurn)
  @IsInt()
  @Min(TrainingValidate.minCaloriesToBurn)
  @Max(TrainingValidate.maxCaloriesToBurn)
  caloriesToBurn: number;

  @ApiProperty({
    description: 'Описание тренировки.'
  })
  @IsString()
  @MinLength(TrainingValidate.minLengthDescription)
  @MaxLength(TrainingValidate.maxLengthDescription)
  description: string;

  @ApiProperty({
    description: 'Пол пользователя для которого предназначена тренировка.',
    example: 'неважно'
  })
  @IsString()
  @IsEnum(Gender)
  usersGender: string;

  @ApiProperty({
    description: 'Признак специального предложения.',
    example: 'true'
  })
  @Transform(({ obj }) => obj.specialOffer === 'true')
  @IsBoolean()
  specialOffer: boolean;
}
