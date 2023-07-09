import { IsIn, IsInt, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { QueryOption } from '../../app.const';

export class ReviewQuery {
  @Transform(({ value }) => +value || QueryOption.DefaultCountLimit)
  @IsInt()
  @Max(QueryOption.MaxCountLimit)
  public limit: number = QueryOption.DefaultCountLimit;

  @IsIn(['createdAt', 'evaluation'])
  public category: string = QueryOption.DefaultSortCategory;

  @IsIn(['asc', 'desc'])
  public sortDirection: 'desc' | 'asc' = QueryOption.DefaultSortDirection;

  @Transform(({ value }) => +value)
  @IsInt()
  public page = 0;
}
