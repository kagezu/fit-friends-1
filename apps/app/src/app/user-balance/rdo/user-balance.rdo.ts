import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserBalanceRdo {
  @ApiProperty({
    description: 'Тренировка'
  })
  @Expose()
  @Transform(({ obj }) => obj.training.toString())
  training: string;

  @ApiProperty({
    description: 'Количество купленных тренировок'
  })
  @Expose()
  count: number;
}
