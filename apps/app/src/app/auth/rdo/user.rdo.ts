import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserRdo {

  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

}
