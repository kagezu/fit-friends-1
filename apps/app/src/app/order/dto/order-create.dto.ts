import { IsEnum, IsInt, IsMongoId, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@fit-friends-1/shared/app-types';

export class OrderCreateDto {
  @ApiProperty({
    description: 'Id тренировки',
    example: '64a2e6bd72ccb0ea0c37c860'
  })
  @IsMongoId()
  training: string;

  @ApiProperty({
    description: 'Количество приобретаемых тренировок.',
    example: '5'
  })
  @IsPositive()
  @IsInt()
  count: number;

  @ApiProperty({
    description: 'Вариант оплаты заказа.',
    example: 'visa',
    enum: PaymentMethod
  })
  @IsString()
  @IsEnum(PaymentMethod)
  paymentMethod: string;
}
