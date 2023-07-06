import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserBalance } from '@fit-friends-1/shared/app-types';

@Schema({
  collection: 'user-balances',
  timestamps: false,
})
export class UserBalanceModel extends Document implements UserBalance {
  @Prop({
    ref: 'UserModel',
    type: SchemaTypes.ObjectId,
    required: true
  })
  userId: string;

  @Prop({
    ref: 'TrainingModel',
    type: SchemaTypes.ObjectId,
    required: true
  })
  training: string;

  @Prop({
    required: true
  })
  count: number;
}

export const UserBalanceSchema = SchemaFactory.createForClass(UserBalanceModel);
