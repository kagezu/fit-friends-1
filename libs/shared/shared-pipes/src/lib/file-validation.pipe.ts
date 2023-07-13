import { BadRequestException, Injectable, PayloadTooLargeException, PipeTransform } from '@nestjs/common';
import { extension } from 'mime-types';
import 'multer';
import { UserFiles } from '@fit-friends-1/shared/app-types';

const MAX_LIMIT_FILE_SIZE = 1000000;
const CERTIFICATE_EXTENSION = 'pdf';
const avatarExtensions = ['jpeg', 'png'];
enum MessagePipe {
  CertificateInvalid = 'Certificate invalid mimetype',
  AvatarInvalid = 'Avatar invalid mimetype'
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(files: UserFiles) {
    if (!files) {
      return;
    }

    if (files.certificate && CERTIFICATE_EXTENSION !== extension(files.certificate[0].mimetype)) {
      throw new BadRequestException(MessagePipe.CertificateInvalid);
    }

    if (files.avatar) {
      if (MAX_LIMIT_FILE_SIZE < files.avatar[0].size) {
        throw new PayloadTooLargeException(`Avatar must not be larger than ${MAX_LIMIT_FILE_SIZE} bytes`);
      }

      const avatarExtension = extension(files.avatar[0].mimetype);
      if (!avatarExtensions.some((item) => item === avatarExtension)) {
        throw new BadRequestException(MessagePipe.AvatarInvalid);
      }
    }

    return files;
  }
}
