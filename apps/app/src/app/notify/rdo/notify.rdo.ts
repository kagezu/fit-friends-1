import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotifyRdo {
  @ApiProperty({
    description: 'Время создания'
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Пользователь'
  })
  @Expose()
  user: string;

  @ApiProperty({
    description: 'Сообщение'
  })
  @Expose()
  message: string;
}
