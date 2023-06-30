import { IsInt, IsMongoId, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

enum FeedbackValidate {
  minEvaluation = 1,
  maxEvaluation = 5,
  minLengthTextFeedback = 100,
  maxLengthTextFeedback = 1024,

}

export class FeedbackCreateDto {

  @ApiProperty({
    description: 'Тренировка.',
    example: '649e7a2b5fe3c92e6ca9eeda'
  })
  @IsString()
  @IsMongoId()
  trainingId: string;

  @Transform(({ obj }) => +obj.evaluation)
  @IsInt()
  @Min(FeedbackValidate.minEvaluation)
  @Max(FeedbackValidate.maxEvaluation)
  evaluation: number;

  @ApiProperty({
    description: 'Текст с общей информацией.'
  })
  @IsString()
  @MinLength(FeedbackValidate.minLengthTextFeedback)
  @MaxLength(FeedbackValidate.maxLengthTextFeedback)
  textFeedback: string;
}
