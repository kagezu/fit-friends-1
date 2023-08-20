import { IsEnum, IsIn, IsInt, IsOptional, IsBoolean, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { FieldList, SortDirection, TrainingLevel, TrainingType, locations } from '@fit-friends-1/shared/app-types';
import { QueryOption } from '../../app.const';
import { SortOrder } from 'mongoose';

export class UserQuery {
  @Transform(({ value }) => +value || QueryOption.DefaultCountLimit)
  @IsInt()
  @Max(QueryOption.MaxCountLimit)
  public limit: number = QueryOption.DefaultCountLimit;

  @IsIn([FieldList.CreatedAt, FieldList.Role])
  public category: string = QueryOption.DefaultSortCategory;

  @IsEnum(SortDirection)
  public sortDirection: SortOrder = QueryOption.DefaultSortDirection;

  @Transform(({ value }) => +value)
  @IsInt()
  public page = 0;

  @Transform(({ value }) => value.split(','))
  @IsIn(locations, {
    each: true
  })
  @IsOptional()
  public location?: string[];

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
