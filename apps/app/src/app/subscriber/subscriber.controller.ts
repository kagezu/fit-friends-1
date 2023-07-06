import { MongoidValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { ApiCreatedResponse, ApiUnauthorizedResponse, ApiConflictResponse, ApiHeader, ApiNotFoundResponse } from '@nestjs/swagger';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';
import { SubscriberService } from './subscriber.service';
import { Controller, Delete, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Subscriber } from 'rxjs';

@Controller('subscribe')
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService,
  ) { }

  /** Подписка на новые тренировки тренера */
  @ApiCreatedResponse({
    description: 'Тew subscription completed.',
    type: Subscriber
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiConflictResponse({ description: 'The subscription exist.' })
  @ApiNotFoundResponse({ description: 'Coach not found.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtUserGuard)
  @Post(':id')
  public async create(
    @Param('id', MongoidValidationPipe) id: string,
    @Req() req: Request
  ) {
    const { name, email } = req['user'];
    return this.subscriberService.add({
      name,
      email,
      coach: id
    });
  }

  /** Отписка от новых тренировки тренера */
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Subscription not found.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtUserGuard)
  @Delete(':id')
  public async delete(
    @Param('id', MongoidValidationPipe) id: string,
    @Req() req: Request
  ) {
    const { email } = req['user'];
    return this.subscriberService.delete(email, id);
  }
}
