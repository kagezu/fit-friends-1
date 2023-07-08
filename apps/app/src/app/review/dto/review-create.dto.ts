import { IsInt, IsMongoId, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ReviewValidate } from '../review.const';

export class ReviewCreateDto {
  @ApiProperty({
    description: 'Id тренировки',
    example: '64a2e6bd72ccb0ea0c37c860'
  })
  @IsMongoId()
  training: string;

  @ApiProperty({
    description: 'Оценка тренировки',
    example: '4'
  })
  @Transform(({ obj }) => +obj.evaluation)
  @IsInt()
  @Min(ReviewValidate.MinEvaluation)
  @Max(ReviewValidate.MaxEvaluation)
  @IsOptional()
  evaluation: number;

  @ApiProperty({
    description: 'Отзыв',
    example: 'Текст отзыва.',
  })
  @IsString()
  @MinLength(ReviewValidate.MinLengthReview)
  @MaxLength(ReviewValidate.MaxLengthReview)
  textReview: string;
}
