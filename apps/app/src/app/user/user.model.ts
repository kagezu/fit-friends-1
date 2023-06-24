import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserRole } from '@fit-friends-1/shared/app-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements User {

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop()
  avatar: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  gender: string;
  birthday: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.User,
  })

  @Prop()
  public role: string;
  @Prop()
  description: string;
  @Prop()
  location: string;
  @Prop()
  background: string;

  @Prop()
  trainingLevel: string;
  @Prop()
  trainingType: string[];

  @Prop()
  interval: string;
  @Prop()
  caloriesToBurn: number;
  @Prop()
  caloriesPerDay: number;
  @Prop()
  readyForTraining: boolean;

  @Prop()
  certificate: string;
  @Prop()
  meritsOfCoach: string;
  @Prop()
  readyForIndividualTraining: boolean;
}

export const userSchema = SchemaFactory.createForClass(UserModel);
