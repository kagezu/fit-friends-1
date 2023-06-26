import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  @Matches('^([а-яё]+|[a-z]+)$', 'i', { message: 'Имя, должно быть, написано либо с использованием кириллицы или латиницы.' })
  name: string;

  email: string;
  avatar: string;
  password: string;
  gender: string;
  birthday: string;
  role: string;
  description: string;
  location: string;
  background: string;

  trainingLevel: string;
  trainingType: string[];

  interval: string;
  caloriesToBurn: number;
  caloriesPerDay: number;
  readyForTraining: boolean;
}
