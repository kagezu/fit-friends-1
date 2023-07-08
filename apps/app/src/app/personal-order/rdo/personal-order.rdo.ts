import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@fit-friends-1/shared/app-types';
import { Expose, Transform } from 'class-transformer';

export class PersonalOrderRdo {
  @ApiProperty({
    description: 'Идентификатор заявки',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @ApiProperty({
    description: 'Инициатор заявки',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose()
  @Transform(({ obj }) => obj.initiator.toString())
  initiator: string;

  @ApiProperty({
    description: 'Получатель заявки',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose()
  @Transform(({ obj }) => obj.user.toString())
  user: string;

  @ApiProperty({
    description: 'Дата и время создания заявки.',
    example: '2023-07-01T03:22:37.798Z'
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    description: 'Дата и время изменения статуса.',
    example: '2023-07-01T03:22:37.798Z'
  })
  @Expose()
  updatedAt: string;

  @ApiProperty({
    description: 'Статус заявки.',
    example: 'принята',
    enum: OrderStatus
  })
  @Expose()
  orderStatus: string;
}
