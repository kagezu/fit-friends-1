import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FriendCreateDto {
  @ApiProperty({
    description: 'Id пользователя',
    example: '64a2e6bd72ccb0ea0c37c860'
  })
  @IsMongoId()
  friendId: string;
}
