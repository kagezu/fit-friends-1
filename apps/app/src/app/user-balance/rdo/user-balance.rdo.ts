import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { TrainingRdo } from '../../training/rdo/training.rdo';

export class UserBalanceRdo {
  @ApiProperty({
    description: 'Тренировка'
  })
  @Expose()
  @Type(() => TrainingRdo)
  training: TrainingRdo;

  @ApiProperty({
    description: 'Количество купленных тренировок'
  })
  @Expose()
  count: number;
}
