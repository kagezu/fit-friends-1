import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
  ) { }

  /** Произвести рассылку уведомлений */
  @HttpCode(HttpStatus.OK)
  @Post('send')
  public async send() {
    await this.mailService.sendNotifyNewTraining();
  }
}
