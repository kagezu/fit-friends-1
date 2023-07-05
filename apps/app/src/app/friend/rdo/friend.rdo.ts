import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo';

export class FriendRdo {
  @ApiProperty({
    description: 'Пользователь'
  })
  @Expose()
  @Type(() => UserRdo)
  friend: UserRdo;
}
