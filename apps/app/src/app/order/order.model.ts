import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order } from '@fit-friends-1/shared/app-types';

@Schema({
  collection: 'orders',
  timestamps: true,
})
export class OrderModel extends Document implements Order {
  @Prop()
  purchaseType: string;
  @Prop({
    ref: 'TrainingModel',
    type: SchemaTypes.ObjectId
  })
  training: string;
  @Prop()
  price: number;
  @Prop()
  count: number;
  @Prop()
  orderPrice: number;
  @Prop()
  paymentMethod: string;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
