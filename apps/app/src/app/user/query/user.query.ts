import { IsEnum, IsIn, IsInt, IsOptional, IsBoolean, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { TrainingLevel, TrainingType, locations } from '@fit-friends-1/shared/app-types';
import { QueryOption } from '../../app.const';

export class UserQuery {
  @Transform(({ value }) => +value || QueryOption.DefaultCountLimit)
  @IsInt()
  @Max(QueryOption.MaxCountLimit)
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

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  public readyForTraining: boolean;
}
