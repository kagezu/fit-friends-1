import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { FieldList, Review } from '@fit-friends-1/shared/app-types';
import { ReviewModel } from './review.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewQuery } from './query/review.query';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewModel>) {
  }

  public async create(item: ReviewEntity): Promise<Review> {
    const newReview = new this.reviewModel(item);
    return await newReview.save();
  }

  public async index(
    training: string,
    { limit, page, sortDirection, category }: ReviewQuery
  ): Promise<Review[]> {
    return this.reviewModel
      .find({ training })
      .sort([[category, sortDirection]])
      .skip(page * limit)
      .limit(limit)
      .populate([FieldList.Author, {
        path: FieldList.Author,
        populate: FieldList.Avatar
      }])
      .exec();
  }

  public async check(author: string, training: string): Promise<Review> {
    return this.reviewModel
      .findOne({ author, training })
      .exec();
  }

  public async getAverageRating(training: string): Promise<number> {
    const reviews = await this.reviewModel
      .find({ training })
      .exec();
    const sum = reviews.reduce((current, { evaluation }) => current + evaluation, 0);
    return sum / reviews.length;
  }
}
