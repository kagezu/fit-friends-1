import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UploadedFileRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'Original name',
    example: 'logo.jpg',
  })
  @Expose()
  public originalName: string;

  @ApiProperty({
    description: 'Hash name',
    example: '6437c9bdaa7ff52ac6fbe090',
  })
  @Expose()
  public hashName: string;

  @ApiProperty({
    description: 'MIME type',
    example: 'image/jpg',
  })
  @Expose()
  public mimetype: string;

  @ApiProperty({
    description: 'Size in bytes',
    example: '2433221',
  })
  @Expose()
  public size: number;

  @ApiProperty({
    description: 'Path',
    example: 'http://example.com/r646oaer32rfr.jpg',
  })
  @Expose()
  public path: string;
}
