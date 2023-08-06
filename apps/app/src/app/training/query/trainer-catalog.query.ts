import { IsEnum, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { TrainingLevel, TrainingType, intervals } from '@fit-friends-1/shared/app-types';
import { QueryOption } from '../../app.const';

export class TrainingCatalogQuery {
  @Transform(({ value }) => +value || QueryOption.DefaultCountLimit)
  @IsInt()
  @Max(QueryOption.MaxCountLimit)
  public limit: number = QueryOption.DefaultCountLimit;

  @IsIn(['asc', 'desc'])
  public sortDirection: 'desc' | 'asc' = QueryOption.DefaultSortDirection;

  @IsIn(['createdAt', 'price', 'rating'])
  public category: string = QueryOption.DefaultSortCategory;

  @Transform(({ value }) => +value)
  @IsInt()
  public page = 0;

  @Transform(({ value }) => +value)
  @Min(QueryOption.minPrice)
  @IsInt()
  @IsOptional()
  public priceFrom = QueryOption.minPrice;

  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  public priceTo = QueryOption.maxPrice;

  @Transform(({ value }) => +value)
  @Min(QueryOption.minCaloriesToBurn)
  @Max(QueryOption.maxCaloriesToBurn)
  @IsOptional()
  public caloriesFrom = QueryOption.minCaloriesToBurn;

  @Transform(({ value }) => +value)
  @Min(QueryOption.minCaloriesToBurn)
  @Max(QueryOption.maxCaloriesToBurn)
  @IsOptional()
  public caloriesTo = QueryOption.maxCaloriesToBurn;

  @Transform(({ value }) => +value)
  @Min(QueryOption.minRatind)
  @Max(QueryOption.maxRating)
  @IsInt()
  @IsOptional()
  public ratingFrom = QueryOption.minRatind;

  @Transform(({ value }) => +value)
  @Min(QueryOption.minRatind)
  @Max(QueryOption.maxRating)
  @IsInt()
  @IsOptional()
  public ratingTo = QueryOption.maxRating;

  @Transform(({ value }) => value.split(','))
  @IsEnum(TrainingType, {
    each: true
  })
  @IsOptional()
  public trainingType?: string[];

  @IsEnum(TrainingLevel)
  @IsOptional()
  public trainingLevel?: string;

  @Transform(({ value }) => value.split(','))
  @IsIn(intervals, {
    each: true
  })
  @IsOptional()
  public interval?: string[];
}
