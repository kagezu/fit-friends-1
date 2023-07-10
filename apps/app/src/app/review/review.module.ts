import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModule } from '../training/training.module';
import { ReviewController } from './review.controller';
import { ReviewModel, ReviewSchema } from './review.model';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ReviewModel.name, schema: ReviewSchema }
  ]),
    ConfigModule,
    TrainingModule
  ],
  providers: [
    ReviewRepository,
    ReviewService,
    ReviewController
  ],
  controllers: [ReviewController],
  exports: [
    ReviewService
  ]
})
export class ReviewModule { }

