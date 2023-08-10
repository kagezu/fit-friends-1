import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ReviewRdo {  @ApiProperty({
    description: 'Идентификатор отзыва',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'Идентификатор автора отзыва',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose()
  @Transform(({ obj }) => obj.author.name)
  name: string;

  @ApiProperty({
    description: 'Идентификатор автора отзыва',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose()
  @Transform(({ obj }) => obj.author.avatar.path)
  avatar: string;

  @ApiProperty({
    description: 'Идентификатор тренировки',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose()
  @Transform(({ obj }) => obj.training.toString())
  training: string;

  @ApiProperty({
    description: 'Оценка тренировки',
    example: '4'
  })
  @Expose()
  evaluation: number;

  @ApiProperty({
    description: 'Отзыв',
    example: 'Текст отзыва.',
  })
  @Expose()
  textReview: string;

  @ApiProperty({
    description: 'Дата отзыва',
    example: '10.04.2023'
  })
  @Expose()
  createdAt?: string;
}
