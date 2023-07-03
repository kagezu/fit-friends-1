import { IsEnum, IsIn, IsInt, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { QueryOption } from '../user.constant';
import { TrainingLevel, TrainingType, locations } from '@fit-friends-1/shared/app-types';

export class UserQuery {
  @Transform(({ value }) => +value || QueryOption.DefaultCountLimit)
  @IsInt()
  @Max(QueryOption.DefaultCountLimit)
  public limit: number = QueryOption.DefaultCountLimit;

  @IsIn(['createdAt', 'role'])
  public category: string = QueryOption.DefaultSortCategory;

  @IsIn(['asc', 'desc'])
  public sortDirection: 'desc' | 'asc' = QueryOption.DefaultSortDirection;

  @Transform(({ value }) => +value)
  @IsInt()
  public page = 0;

  @IsOptional()
  @IsIn(locations)
  public location?: string;

  @IsOptional()
  @IsEnum(TrainingLevel)
  public trainingLevel?: string;

  @Transform(({ value }) => value.split(','))
  @IsEnum(TrainingType, {
    each: true
  })
  @IsOptional()
  public trainingTypes?: string[];
}
