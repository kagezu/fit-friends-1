import { Injectable, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReviewCreateDto } from './dto/review-create.dto';
import { TrainingController } from './review.controller';
import { ReviewRepository } from './review.repository';


@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly trainingController: TrainingController,
  ) { }

  /** Создание отзыва */
  public async create() {
    if (!video) {
      throw new BadRequestException('Video file is request');
    }

    // return newReview;
  }

  /** Список отзывов */
  public async index(coachId: string, query: ReviewCatalogQuery) {
    const ReviewQuery = plainToInstance(
      ReviewCatalogQuery,
      query,
      { enableImplicitConversion: true });
    return this.reviewRepository.index(coachId, ReviewQuery);
  }
}
