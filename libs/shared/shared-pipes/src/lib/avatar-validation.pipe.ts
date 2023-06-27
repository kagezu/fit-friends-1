import { ArgumentMetadata, BadRequestException, Injectable, PayloadTooLargeException, PipeTransform } from '@nestjs/common';
import { extension } from 'mime-types';
import 'multer';

const MAX_LIMIT_FILE_SIZE = 1000000;
const acceptableExtensions = ['jpg', 'png'];

@Injectable()
export class AvatarValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File, { type }: ArgumentMetadata) {
    if (type !== 'custom') {
      throw new Error('This pipe must used only with custom!')
    }

    if (file.size > MAX_LIMIT_FILE_SIZE) {
      throw new PayloadTooLargeException(`File must not be larger than ${MAX_LIMIT_FILE_SIZE} bytes`);
    }

    const fileExtension = extension(file.mimetype);
    if (!acceptableExtensions.some((item) => item === fileExtension)) {

      console.log(file);
      console.log(fileExtension);
      throw new BadRequestException('Invalid mimetype');
    }

    console.log(file);
    console.log(fileExtension);

    throw new BadRequestException();
    // return file.mimetype;
  }
}
