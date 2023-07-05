import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@fit-friends-1/shared/app-types';
import { Expose, Type } from 'class-transformer';
import { TrainingRdo } from '../../training/rdo/training.rdo';

export class OrderRdo {
  @ApiProperty({
    description: 'Вид покупки.',
    example: 'абонемент'
  })
  @Expose()
  purchaseType: string;

  @ApiProperty({
    description: 'Стоимость приобретаемой тренировки.',
    example: '500'
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Стоимость заказа.',
    example: '2500'
  })
  @Expose()
  orderPrice: number;

  @ApiProperty({
    description: 'Дата и время создания заказа.',
    example: '2023-07-01T03:22:37.798Z'
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    description: 'Тренировка'
  })
  @Expose()
  @Type(() => TrainingRdo)
  training: TrainingRdo;

  @ApiProperty({
    description: 'Количество приобретаемых тренировок.',
    example: '5'
  })
  count: number;

  @ApiProperty({
    description: 'Вариант оплаты заказа.',
    example: 'visa',
    enum: PaymentMethod
  })
  paymentMethod: string;
}
