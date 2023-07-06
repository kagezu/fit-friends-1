import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber } from '@fit-friends-1/shared/app-types';

const SUBSCRIBERS_COLLECTION_NAME = 'subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class SubscriberModel extends Document implements Subscriber {
  @Prop()
  public name: string;
  @Prop()
  email: string;
  @Prop()
  coach: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
