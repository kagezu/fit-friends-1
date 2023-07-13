import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

enum MessagePipe {
  BadMongoId = 'Bad entity ID',
  UsedOnlyWithParams = 'This pipe must used only with params!'
}

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(MessagePipe.UsedOnlyWithParams)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(MessagePipe.BadMongoId);
    }

    return value;
  }
}
