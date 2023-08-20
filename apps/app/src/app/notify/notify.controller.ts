import { Controller, HttpCode, HttpStatus, UseGuards, Req, Param, Get, Delete } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { NotifyService } from './notify.service';
import { NotifyRdo } from './rdo/notify.rdo';
import { MongoidValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FieldList } from '@fit-friends-1/shared/app-types';

@ApiTags('notify')
@Controller('notify')
export class NotifyController {
  constructor(
    private readonly notifyService: NotifyService,
  ) { }

  /** Удаление оповещения */
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Notify not exist.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async delete(
    @Param('id', MongoidValidationPipe) id: string,
    @Req() req: Request
  ) {
    return await this.notifyService.destroy(req[FieldList.User]._id, id);
  }

  /** Список оповещений */
  @ApiOkResponse({
    description: 'New Notify added successfully.',
    type: [NotifyRdo]
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Notify not exist.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  public async index(@Req() req: Request) {
    const existNotifies = await this.notifyService.index(req[FieldList.User]._id);
    return fillObject(NotifyRdo, existNotifies);
  }
}
