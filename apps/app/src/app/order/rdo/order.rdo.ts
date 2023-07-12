import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@fit-friends-1/shared/app-types';
import { Expose, Transform } from 'class-transformer';

export class OrderRdo {
  @ApiProperty({
    description: 'Вид покупки.',
    example: 'абонемент'
  })
  @Expose()
  purchaseType: string;

  @ApiProperty({
    description: 'Стоимость приобретённой тренировки.',
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
  @Transform(({ obj }) => obj.training._id.toString())
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

  @ApiProperty({
    description: 'Общая стоимость всех заказов.',
    example: '4500'
  })
  @Transform(({ obj }) => obj.training.totalSale)
  @Expose()
  totalSale: number;

  @ApiProperty({
    description: 'Общее количество приобретаемых тренировок.',
    example: '15'
  })
  @Transform(({ obj }) => obj.training.totalAmount)
  @Expose()
  totalAmount: number;
}
