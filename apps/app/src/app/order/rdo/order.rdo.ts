import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@fit-friends-1/shared/app-types';
import { Expose } from 'class-transformer';

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
    description: 'Id тренировки',
    example: '64a2e6bd72ccb0ea0c37c860'
  })
  @Expose()
  training: string;

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
