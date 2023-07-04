import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { TrainingQueryOption } from '../training.const';
import { intervals } from '@fit-friends-1/shared/app-types';

export class TrainingQuery {
  @Transform(({ value }) => +value || TrainingQueryOption.DefaultCountLimit)
  @IsInt()
  @Max(TrainingQueryOption.MaxCountLimit)
  public limit: number = TrainingQueryOption.DefaultCountLimit;

  @IsIn(['asc', 'desc'])
  public sortDirection: 'desc' | 'asc' = TrainingQueryOption.DefaultSortDirection;

  @Transform(({ value }) => +value)
  @IsInt()
  public page = 0;

  @Min(TrainingQueryOption.minPrice)
  @IsInt()
  @IsOptional()
  public priceFrom = TrainingQueryOption.minPrice;

  @IsInt()
  @IsOptional()
  public priceTo: number;

  @Min(TrainingQueryOption.minCaloriesToBurn)
  @Max(TrainingQueryOption.maxCaloriesToBurn)
  @IsOptional()
  public caloriesFrom = TrainingQueryOption.minCaloriesToBurn;

  @Min(TrainingQueryOption.minCaloriesToBurn)
  @Max(TrainingQueryOption.maxCaloriesToBurn)
  @IsOptional()
  public caloriesTo = TrainingQueryOption.maxCaloriesToBurn;

  @Min(TrainingQueryOption.minRatind)
  @Max(TrainingQueryOption.maxRating)
  @IsInt()
  @IsOptional()
  public rating: number;

  @Transform(({ value }) => value.split(','))
  @IsIn(intervals, {
    each: true
  })
  @IsOptional()
  public interval: string[];
}
