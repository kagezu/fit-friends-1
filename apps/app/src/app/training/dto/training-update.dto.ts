import { IsBoolean, IsEnum, IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, TrainingLevel, TrainingType, intervals } from '@fit-friends-1/shared/app-types';
import { Transform } from 'class-transformer';
import { TrainingValidate } from '../training.const';

export class TrainingUpdateDto {
  @ApiProperty({
    description: 'Название тренировки',
    example: 'Разминка',
  })
  @IsString()
  @MinLength(TrainingValidate.minLengthTitle)
  @MaxLength(TrainingValidate.maxLengthTitle)
  @IsOptional()
  title: string;

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
    example: 'бег',
    enum: TrainingType
  })
  @IsString()
  @IsEnum(TrainingType)
  @IsOptional()
  trainingType: string;

  @ApiProperty({
    description: 'Время на тренировку.',
    example: '30-50 мин',
    enum: intervals
  })
  @IsString()
  @IsIn(intervals)
  @IsOptional()
  interval: string;

  @ApiProperty({
    description: 'Стоимость тренировки в рублях.',
    example: '1000',
    minimum: TrainingValidate.minPrice
  })
  @Transform(({ obj }) => +obj.price ?? 'x')
  @IsInt()
  @Min(TrainingValidate.minPrice)
  @IsOptional()
  price: number;

  @ApiProperty({
    description: 'Количество калорий для сброса.',
    example: '2000',
    minimum: TrainingValidate.minCaloriesToBurn,
    maximum: TrainingValidate.maxCaloriesToBurn
  })
  @Transform(({ obj }) => +obj.caloriesToBurn)
  @IsInt()
  @Min(TrainingValidate.minCaloriesToBurn)
  @Max(TrainingValidate.maxCaloriesToBurn)
  @IsOptional()
  caloriesToBurn: number;

  @ApiProperty({
    description: 'Описание тренировки.'
  })
  @IsString()
  @MinLength(TrainingValidate.minLengthDescription)
  @MaxLength(TrainingValidate.maxLengthDescription)
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Пол пользователя для которого предназначена тренировка.',
    example: 'неважно',
    enum: Gender
  })
  @IsString()
  @IsEnum(Gender)
  @IsOptional()
  usersGender: string;

  @ApiProperty({
    description: 'Признак специального предложения.',
    example: 'true'
  })
  @Transform(({ obj }) => obj.specialOffer === 'true')
  @IsBoolean()
  @IsOptional()
  specialOffer: boolean;
}
