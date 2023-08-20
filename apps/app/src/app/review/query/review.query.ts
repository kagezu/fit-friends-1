import { IsEnum, IsIn, IsInt, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { QueryOption } from '../../app.const';
import { FieldList, SortDirection } from '@fit-friends-1/shared/app-types';
import { SortOrder } from 'mongoose';

export class ReviewQuery {
  @Transform(({ value }) => +value || QueryOption.DefaultCountLimit)
  @IsInt()
  @Max(QueryOption.MaxCountLimit)
  public limit: number = QueryOption.DefaultCountLimit;

  @IsIn([FieldList.CreatedAt, FieldList.Evaluation])
  public category: string = QueryOption.DefaultSortCategory;

  @IsEnum(SortDirection)
  public sortDirection: SortOrder = QueryOption.DefaultSortDirection;

  @Transform(({ value }) => +value)
  @IsInt()
  public page = 0;
}
