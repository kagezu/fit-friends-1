import { BadRequestException } from '@nestjs/common';

export class AuthorizedUserException extends BadRequestException {
  constructor(user: string) {
    super(`Action denied for authorized users: '${user}'`);
  }
}
