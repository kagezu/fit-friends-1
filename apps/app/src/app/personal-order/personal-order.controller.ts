import { MongoidValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { fillObject } from '@fit-friends-1/util/util-core';
import { Controller, UseGuards, HttpCode, HttpStatus, Post, Param, Req, Get, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiUnauthorizedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiBadRequestResponse, ApiConflictResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';
import { PersonalOrderService } from './personal-order.service';
import { PersonalOrderRdo } from './rdo/personal-order.rdo';
import { UpdatePersonalOrderDto } from './dto/personal-order.dto';

@ApiTags('personal-order')
@Controller('personal-order')
export class PersonalOrderController {
  constructor(
    private readonly personalOrderService: PersonalOrderService,
  ) { }

  /** Создание заявки на персональную/совместную тренировку */
  @ApiCreatedResponse({
    description: 'New personal order added successfully.',
    type: PersonalOrderRdo
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User not exist.' })
  @ApiBadRequestResponse()
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(':user')
  public async create(
    @Param('user', MongoidValidationPipe) user: string,
    @Req() req: Request
  ) {
    const newOrder = await this.personalOrderService.create(req['user'], user);
    return fillObject(PersonalOrderRdo, newOrder);
  }

  /** Изменение статуса заявки  */
  @ApiOkResponse({
    description: 'Request status changed successfully.',
    type: PersonalOrderRdo
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Personal order not exist.' })
  @ApiConflictResponse({ description: 'Status not changed.' })
  @ApiBadRequestResponse()
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async delete(
    @Param('id', MongoidValidationPipe) id: string,
    @Req() req: Request,
    @Body() dto: UpdatePersonalOrderDto
  ) {
    const personalOrder = await this.personalOrderService.update(req['user'], id, dto.orderStatus);
    return fillObject(PersonalOrderRdo, personalOrder);
  }

  /** Список заявок */
  @ApiOkResponse({
    type: [PersonalOrderRdo]
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  public async index(@Req() req: Request) {
    const existPersonalOrders = await this.personalOrderService.index(req['user']._id);
    return fillObject(PersonalOrderRdo, existPersonalOrders);
  }
}