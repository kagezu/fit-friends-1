import { Controller, HttpCode, HttpStatus, UseGuards, Req, Get, Query, Body, Post } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtCoachGuard } from '../auth/guards/jwt-coach.guard';
import { OrderRdo } from './rdo/order.rdo';
import { CoachOrderQuery } from './query/coach-order.query';
import { OrderService } from './order.service';
import { OrderCreateDto } from './dto/order-create.dto';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';
import { UserBalanceRdo } from '../user-balance/rdo/user-balance.rdo';
import { FieldList } from '@fit-friends-1/shared/app-types';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) { }

  /**  Создание нового заказа */
  @ApiCreatedResponse({
    description: 'The new Order has been successfully created.',
    type: OrderRdo
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(
    @Body() dto: OrderCreateDto,
    @Req() req: Request
  ) {
    const newBalance = await this.orderService.create(req[FieldList.User]._id, dto);
    return fillObject(UserBalanceRdo, newBalance);
  }

  /** Список заказов тренера */
  @ApiOkResponse({
    type: [OrderRdo],
    description: 'Order found'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @ApiQuery({
    description: 'Query options',
    type: CoachOrderQuery
  })
  @UseGuards(JwtCoachGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  public async list(@Query() query: CoachOrderQuery,
    @Req() req: Request
  ) {
    return fillObject(
      OrderRdo,
      await this.orderService.index(req[FieldList.User]._id, query)
    );
  }
}
