import { IsEmail, IsEnum, IsISO8601, IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserMessage, UserValidate } from '../auth.constant';
import { Gender, UserRole, locations } from '@fit-friends-1/shared/app-types';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
    minLength: UserValidate.minLengthName,
    maxLength: UserValidate.maxLengthName
  })
  @IsString()
  @MinLength(UserValidate.minLengthName)
  @MaxLength(UserValidate.maxLengthName)
  @Matches('^([а-яё]+|[a-z]+)$', 'i', { message: UserMessage.NameNotValid })
  name: string;

  @ApiProperty({
    description: 'Уникальный адрес электронной почты',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: UserMessage.EmailNotValid })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456',
    minLength: UserValidate.minLengthPassword,
    maxLength: UserValidate.maxLengthPassword
  })
  @IsString()
  @MinLength(UserValidate.minLengthPassword)
  @MaxLength(UserValidate.maxLengthPassword)
  password: string;

  @ApiProperty({
    description: 'Пол пользователя.',
    example: 'неважно',
    enum: Gender
  })
  @IsString()
  @IsEnum(Gender)
  gender: string;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1981-03-12'
  })
  @IsISO8601()
  @IsOptional()
  birthday?: Date;

  @ApiProperty({
    description: 'Роль пользователя.',
    example: 'тренер',
    enum: UserRole
  })
  @IsString()
  @IsEnum(UserRole)
  role: string;

  @ApiProperty({
    description: 'Одна из станций.',
    example: 'Звёздная',
    enum: locations
  })
  @IsString()
  @IsIn(locations)
  location: string;
}
