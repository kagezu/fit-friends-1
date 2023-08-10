import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Review } from '@fit-friends-1/shared/app-types';

@Schema({
  collection: 'reviews',
  timestamps: true,
})
export class ReviewModel extends Document implements Review {
  @Prop({
    ref: 'UserModel',
    type: SchemaTypes.ObjectId
  })
  author: string;
  @Prop()
  training: string;
  @Prop()
  evaluation: number;
  @Prop()
  textReview: string;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
