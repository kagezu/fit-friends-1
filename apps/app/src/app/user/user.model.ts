import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@fit-friends-1/shared/app-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements User {
  @Prop()
  public name: string;
  @Prop()
  public email: string;
  @Prop()
  public avatar?: string;
  @Prop()
  public passwordHash: string;
  @Prop()
  public gender: string;
  @Prop()
  public birthday?: Date;
  @Prop()
  public role: string;
  @Prop()
  public description?: string;
  @Prop()
  public location: string;
  @Prop()
  public background: string;

  @Prop()
  public trainingLevel: string;
  @Prop()
  public trainingTypes: string[];

  @Prop()
  public interval?: string;
  @Prop()
  public caloriesToBurn?: number;
  @Prop()
  public caloriesPerDay?: number;
  @Prop()
  public readyForTraining?: boolean;

  @Prop()
  public certificate?: string;
  @Prop()
  public meritsOfCoach?: string;
  @Prop()
  public readyForIndividualTraining?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
