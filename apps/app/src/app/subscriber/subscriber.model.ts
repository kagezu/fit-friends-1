import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber } from '@fit-friends-1/shared/app-types';

const SUBSCRIBERS_COLLECTION_NAME = 'subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class SubscriberModel extends Document implements Subscriber {
  @Prop()
  email: string;
  @Prop({
    ref: 'UserModel',
    type: SchemaTypes.ObjectId
  })
  coach: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
