import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRdo } from '../../user/rdo/user.rdo';

export class LoggedUserRdo {
  /*
    @ApiProperty({
      description: 'The uniq user ID',
      example: 'e1769d10b6d7'
    })
    @Expose({ name: '_id' })
    @Transform(({ obj }) => obj._id.toString())
    public id: string;
  
    @ApiProperty({
      description: 'User email',
      example: 'user@user.local'
    })
    @Expose()
    public email: string;
  
    @ApiProperty({
      description: 'Роль пользователя.',
      example: 'тренер',
      enum: UserRole
    })
    @Expose()
    role: string;
    */

  @ApiProperty({
    description: 'Пользователь.',
    type: UserRdo
  })
  @Expose()
  user: UserRdo;

  @ApiProperty({
    description: 'Access token'
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Access token'
  })
  @Expose()
  public refreshToken: string;
}
