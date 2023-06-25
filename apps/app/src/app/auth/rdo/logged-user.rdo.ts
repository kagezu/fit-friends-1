import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {

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
    description: 'Access token',
    example: 'e1769d10-b6d7-49d9-81b4-e9c1ada05f5e'
  })
  @Expose()
  public accessToken: string;
}
