import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Friend } from '@fit-friends-1/shared/app-types';

@Schema({
  collection: 'friends',
  timestamps: false,
})
export class FriendModel extends Document implements Friend {
  @Prop({
    ref: 'UserModel',
    type: SchemaTypes.ObjectId,
    required: true
  })
  userId: string;

  @Prop({
    ref: 'UserModel',
    type: SchemaTypes.ObjectId,
    required: true
  })
  friend: string;
}

export const FriendSchema = SchemaFactory.createForClass(FriendModel);
