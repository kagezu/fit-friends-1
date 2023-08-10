import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId } from 'class-validator';

export class UpdateUserBalanceDto {
  @ApiProperty({
    description: 'Id тренировки'
  })
  @IsMongoId()
  training: string;

  @ApiProperty({
    description: 'Количество тренировок подлежащих начислению/списанию'
  })
  @IsInt()
  count: number;
}
