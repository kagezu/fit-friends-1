import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extension } from 'mime-types';
import 'multer';

const videoExtensions = ['mov', 'avi', 'mp4'];

@Injectable()
export class VideoValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (file) {
      const avatarExtension = extension(file.mimetype);
      if (!videoExtensions.some((item: string) => item === avatarExtension)) {
        throw new BadRequestException('Video invalid mimetype');
      }
    }
    return file;
  }
}
