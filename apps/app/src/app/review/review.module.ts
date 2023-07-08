import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './Review.model';
import { ReviewRepository } from './Review.repository';
import { ConfigModule } from '@nestjs/config';
import { ReviewController } from './Review.controller';
import { ReviewService } from './Review.service';
import { FileModule } from '../file/file.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: ReviewModel.name, schema: ReviewSchema }
  ]),
    ConfigModule,
    FileModule,
    MailModule
  ],
  providers: [
    ReviewRepository,
    ReviewService,
    ReviewController
  ],
  exports: [
    ReviewRepository,
    ReviewService
  ],
  controllers: [ReviewController],
})
export class ReviewModule { }

