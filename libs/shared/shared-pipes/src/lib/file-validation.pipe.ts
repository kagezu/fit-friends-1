import { BadRequestException, Injectable, PayloadTooLargeException, PipeTransform } from '@nestjs/common';
import { extension } from 'mime-types';
import 'multer';
import { UserFiles } from '@fit-friends-1/shared/app-types';

const MAX_LIMIT_FILE_SIZE = 1000000;
const certificateExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
const avatarExtensions = ['jpeg', 'png'];
enum MessagePipe {
  CertificateInvalid = 'certificate invalid mimetype',
  AvatarInvalid = 'avatar invalid mimetype'
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(files: UserFiles) {
    if (!files) {
      return;
    }

    if (files.certificate) {
      const certificateExtension = extension(files.certificate[0].mimetype);
      if (!certificateExtensions.some((item) => item === certificateExtension)) {
        throw new BadRequestException(MessagePipe.CertificateInvalid);
      }
    }

    if (files.avatar) {
      if (MAX_LIMIT_FILE_SIZE < files.avatar[0].size) {
        throw new PayloadTooLargeException(`avatar must not be larger than ${MAX_LIMIT_FILE_SIZE} bytes`);
      }

      const avatarExtension = extension(files.avatar[0].mimetype);
      if (!avatarExtensions.some((item) => item === avatarExtension)) {
        throw new BadRequestException(MessagePipe.AvatarInvalid);
      }
    }

    return files;
  }
}
