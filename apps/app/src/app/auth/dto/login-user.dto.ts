import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UserMessage, UserValidate } from '../auth.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'Адрес электронной почты ',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: UserMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(UserValidate.minLengthPassword)
  @MaxLength(UserValidate.maxLengthPassword)
  public password: string;
}
