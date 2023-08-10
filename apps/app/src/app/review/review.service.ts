import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ReviewCreateDto } from './dto/review-create.dto';
import { ReviewRepository } from './review.repository';
import { ReviewEntity } from './review.entity';
import { TrainingRepository } from '../training/training.repository';
import { ReviewQuery } from './query/review.query';
import { TrainingEntity } from '../training/training.entity';
import { plainToInstance } from 'class-transformer';

enum ExceptionMessage {
  TrainingNotFound = 'message Training not exist.',
  ReviewExists = 'message Review already exists.'
}

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly trainingRepository: TrainingRepository,
  ) { }

  /** Создание отзыва */
  public async create(author: string, dto: ReviewCreateDto) {
    const { training } = dto;
    const existTraining = await this.trainingRepository.findById(training);
    if (!existTraining) {
      throw new NotFoundException(ExceptionMessage.TrainingNotFound);
    }

    const existReview = await this.reviewRepository.check(author, training);
    if (existReview) {
      throw new ConflictException(ExceptionMessage.ReviewExists);
    }

    const newReview = await this.reviewRepository.create(new ReviewEntity({
      ...dto,
      author
    }));

    const rating = await this.reviewRepository.getAverageRating(training);
    await this.trainingRepository.update(training, new TrainingEntity({
      ...existTraining,
      rating
    }));
    return newReview;
  }

  /** Список отзывов */
  public async index(training: string, query: ReviewQuery) {
    const reviewQuery = plainToInstance(
      ReviewQuery,
      query,
      { enableImplicitConversion: true });
    return this.reviewRepository.index(training, reviewQuery);
  }
}
