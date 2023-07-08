import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@fit-friends-1/shared/app-types';
import { IsEnum } from 'class-validator';

export class UpdatePersonalOrderDto {
  @ApiProperty({
    description: 'Новый статус заявки.',
    example: 'принята',
    enum: OrderStatus
  })
  @IsEnum(OrderStatus)
  orderStatus: string;
}
