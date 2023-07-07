import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Notify } from '@fit-friends-1/shared/app-types';

@Schema({
  collection: 'notifies',
  timestamps: true,
})
export class NotifyModel extends Document implements Notify {
  @Prop({
    ref: 'UserModel',
    type: SchemaTypes.ObjectId,
    required: true
  })
  user: string;

  @Prop({})
  message: string;
}

export const NotifySchema = SchemaFactory.createForClass(NotifyModel);
