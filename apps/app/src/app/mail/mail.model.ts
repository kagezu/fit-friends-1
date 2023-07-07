import { Document, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MailQueue } from '@fit-friends-1/shared/app-types';

@Schema({
  collection: 'queue-mails',
  timestamps: false,
})
export class MailModel extends Document implements MailQueue {
  @Prop()
  emails: string[];

  @Prop({
    ref: 'TrainingModel',
    type: SchemaTypes.ObjectId,
    required: true
  })
  training: string;
}

export const MailSchema = SchemaFactory.createForClass(MailModel);
