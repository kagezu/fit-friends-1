import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Training } from '@fit-friends-1/shared/app-types';

@Schema({
  collection: 'trainings',
  timestamps: true,
})
export class TrainingModel extends Document implements Training {
  @Prop()
  public title: string;
  @Prop()
  public background: string;
  @Prop()
  public trainingLevel: string;
  @Prop()
  public trainingType: string;
  @Prop()
  public interval: string;
  @Prop({
    default: 0
  })
  public price: number;
  @Prop()
  public caloriesToBurn: number;
  @Prop()
  public description: string;
  @Prop()
  public usersGender: string;
  @Prop({
    ref: 'FileModel',
    type: SchemaTypes.ObjectId
  })
  public demoVideo: string;
  @Prop({
    default: 0
  })
  public rating: number;
  @Prop({
    ref: 'UserModel',
    type: SchemaTypes.ObjectId
  })
  public coachId: string;
  @Prop()
  public specialOffer: boolean;
  @Prop()
  totalSale: number;
  @Prop()
  totalAmount: number;
}

export const TrainingSchema = SchemaFactory.createForClass(TrainingModel);
