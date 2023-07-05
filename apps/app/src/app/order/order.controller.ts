import { Controller, HttpCode, HttpStatus, UseGuards, Req, Get, Query } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtCoachGuard } from '../auth/guards/jwt-coach.guard';
import { OrderRdo } from './rdo/order.rdo';
import { CoachOrderQuery } from './query/coach-order.query';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) { }

  /**  Создание нового заказа */
  /*
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
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('video'))
    @UseGuards(JwtCoachGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post('')
    public async create(
      @Body() dto: OrderCreateDto,
      @Req() req: Request,
      @UploadedFile(VideoValidationPipe) video: Express.Multer.File
    ) {
      const newOrder = await this.OrderService.create(req['user']._id, dto, video);
      return fillObject(OrderRdo, newOrder);
    }
  */


  /** Информация о заказе */
  /*
    @ApiOkResponse({
      description: 'The exist Order.',
      type: OrderRdo
    })
    @ApiBadRequestResponse({ description: 'Bad request.' })
    @ApiNotFoundResponse({ description: 'Order not exist.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiHeader({
      name: 'authorization',
      description: 'Access token'
    })
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    public async show(@Param('id', MongoidValidationPipe) id: string) {
      const existOrder = await this.OrderService.show(id);
      if (!existOrder) {
        throw new NotFoundException('Order not exist');
      }
      return fillObject(OrderRdo, existOrder);
    }
    */

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
    return this.orderService.list(req['user']._id, query);
    //t return fillObject(OrderRdo, existOrders);
  }
}
