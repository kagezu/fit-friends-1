import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { Review } from '@fit-friends-1/shared/app-types';
import { ReviewModel } from './review.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewModel>) {
  }

  public async create(item: ReviewEntity): Promise<Review> {
    const newReview = new this.reviewModel(item);
    return await newReview.save();
  }

  public async index(training: string): Promise<Review[]> {
    return this.reviewModel
      .find({ training })
      .exec();
  }
}
