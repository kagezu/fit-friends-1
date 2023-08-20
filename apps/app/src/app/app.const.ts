import { FieldList, SortDirection } from '@fit-friends-1/shared/app-types';

export enum QueryOption {
  DefaultCountLimit = 50,
  MaxCountLimit = 50,
  DefaultSortDirection = SortDirection.Desc,
  DefaultSortCategory = FieldList.CreatedAt,
  minCaloriesToBurn = 1000,
  maxCaloriesToBurn = 5000,
  maxRating = 5,
  minRatind = 0,
  minPrice = 0,
  maxPrice = 100000
}
