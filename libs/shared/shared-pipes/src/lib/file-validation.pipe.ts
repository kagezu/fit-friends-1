import { BadRequestException, Injectable, PayloadTooLargeException, PipeTransform } from '@nestjs/common';
import { extension } from 'mime-types';
import 'multer';
import { UserFiles } from '@fit-friends-1/shared/app-types';

const MAX_LIMIT_FILE_SIZE = 1000000;
const CERTIFICATE_EXTENSION = 'pdf';
const avatarExtensions = ['jpeg', 'png'];

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(files: UserFiles) {
    const { certificate, avatar } = files;
    if (certificate && CERTIFICATE_EXTENSION !== extension(certificate[0].mimetype)) {
      throw new BadRequestException('Certificate invalid mimetype');
    }

    if (avatar) {
      if (MAX_LIMIT_FILE_SIZE < avatar[0].size) {
        throw new PayloadTooLargeException(`Avatar must not be larger than ${MAX_LIMIT_FILE_SIZE} bytes`);
      }

      const avatarExtension = extension(avatar[0].mimetype);
      if (!avatarExtensions.some((item) => item === avatarExtension)) {
        throw new BadRequestException('Avatar invalid mimetype');
      }
    }

    return files;
  }
}
