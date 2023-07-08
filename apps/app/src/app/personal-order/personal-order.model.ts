import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PersonalOrder } from '@fit-friends-1/shared/app-types';

@Schema({
  collection: 'personal-orders',
  timestamps: true,
})
export class PersonalOrderModel extends Document implements PersonalOrder {
  @Prop({
    ref: 'UserModel',
    type: SchemaTypes.ObjectId,
    required: true
  })
  initiator: string;

  @Prop({
    ref: 'UserModel',
    type: SchemaTypes.ObjectId,
    required: true
  })
  user: string;

  @Prop()
  orderStatus: string;
}

export const PersonalOrderSchema = SchemaFactory.createForClass(PersonalOrderModel);
