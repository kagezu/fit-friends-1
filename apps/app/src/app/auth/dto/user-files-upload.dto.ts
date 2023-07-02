import { ApiProperty } from '@nestjs/swagger';

export class UserFilesUploadDto {
  @ApiProperty({ format: 'binary', required: false })
  avatar?: string;
  @ApiProperty({ format: 'binary', required: false })
  certificate?: string;
}
