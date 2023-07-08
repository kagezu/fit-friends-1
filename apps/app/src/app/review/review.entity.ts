import { Entity } from '@fit-friends-1/util/util-types';
import { Review } from '@fit-friends-1/shared/app-types';

export class ReviewEntity implements Entity<ReviewEntity>, Review {
  author: string;
  training: string;
  evaluation: number;
  textReview: string;
  createdAt?: string;

  constructor(entity: Review) {
    this.fillEntity(entity);
  }

  public fillEntity(entity: Review) {
    this.author = entity.author;
    this.training = entity.training;
    this.evaluation = entity.evaluation;
    this.textReview = entity.textReview;
    this.createdAt = entity.createdAt;
  }

  public toObject(): ReviewEntity {
    return { ...this }
  }
}
