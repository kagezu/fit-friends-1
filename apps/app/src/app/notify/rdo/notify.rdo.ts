import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class NotifyRdo {
  @ApiProperty({
    description: 'Идентификатор сообщения',
    example: '6497e4e84c024e968c12fc9c'
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'Время создания'
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Сообщение'
  })
  @Expose()
  message: string;
}
