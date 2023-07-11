import { IsEnum, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { TrainingQueryOption } from '../training.const';
import { TrainingType } from '@fit-friends-1/shared/app-types';
import { QueryOption } from '../../app.const';

export class TrainingCatalogQuery {
  @Transform(({ value }) => +value || TrainingQueryOption.DefaultCountLimit)
  @IsInt()
  @Max(TrainingQueryOption.MaxCountLimit)
  public limit: number = TrainingQueryOption.DefaultCountLimit;

  @IsIn(['asc', 'desc'])
  public sortDirection: 'desc' | 'asc' = TrainingQueryOption.DefaultSortDirection;

  @IsIn(['createdAt', 'price'])
  public category: string = QueryOption.DefaultSortCategory;

  @Transform(({ value }) => +value)
  @IsInt()
  public page = 0;

  @Transform(({ value }) => +value)
  @Min(TrainingQueryOption.minPrice)
  @IsInt()
  @IsOptional()
  public priceFrom = TrainingQueryOption.minPrice;

  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  public priceTo = TrainingQueryOption.maxPrice;

  @Transform(({ value }) => +value)
  @Min(TrainingQueryOption.minCaloriesToBurn)
  @Max(TrainingQueryOption.maxCaloriesToBurn)
  @IsOptional()
  public caloriesFrom = TrainingQueryOption.minCaloriesToBurn;

  @Transform(({ value }) => +value)
  @Min(TrainingQueryOption.minCaloriesToBurn)
  @Max(TrainingQueryOption.maxCaloriesToBurn)
  @IsOptional()
  public caloriesTo = TrainingQueryOption.maxCaloriesToBurn;

  @Transform(({ value }) => +value)
  @Min(TrainingQueryOption.minRatind)
  @Max(TrainingQueryOption.maxRating)
  @IsInt()
  @IsOptional()
  public ratingFrom = TrainingQueryOption.minRatind;

  @Transform(({ value }) => +value)
  @Min(TrainingQueryOption.minRatind)
  @Max(TrainingQueryOption.maxRating)
  @IsInt()
  @IsOptional()
  public ratingTo = TrainingQueryOption.maxRating;

  @IsEnum(TrainingType)
  @IsOptional()
  public trainingType?: string;
}
