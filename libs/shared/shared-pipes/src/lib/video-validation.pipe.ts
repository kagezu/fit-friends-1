import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extension } from 'mime-types';
import 'multer';

const videoExtensions = ['mov', 'avi', 'mp4'];
const VIDEO_INVALID = 'video invalid mimetype';

@Injectable()
export class VideoValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (file) {
      const avatarExtension = extension(file.mimetype);
      if (!videoExtensions.some((item: string) => item === avatarExtension)) {
        throw new BadRequestException(VIDEO_INVALID);
      }
    }
    return file;
  }
}
