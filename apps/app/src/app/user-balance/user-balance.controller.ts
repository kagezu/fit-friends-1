import { Controller, HttpCode, HttpStatus, UseGuards, Req, Get, Patch, Body, Param } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserBalanceService } from './user-balance.service';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';
import { UserBalanceRdo } from './rdo/user-balance.rdo';
import { JwtCoachGuard } from '../auth/guards/jwt-coach.guard';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { MongoidValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { FieldList } from '@fit-friends-1/shared/app-types';

@ApiTags('balance')
@Controller('balance')
export class UserBalanceController {
  constructor(
    private readonly userBalanceService: UserBalanceService,
  ) { }

  /** Добавление баланса */
  @ApiCreatedResponse({
    description: 'Current balance',
    type: UserBalanceRdo
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiUnauthorizedResponse({ description: 'To change the balance you need to be the creator of the workout.' })
  @ApiNotFoundResponse({ description: 'Training not found.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtCoachGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('add')
  public async increase(
    @Body() dto: UpdateUserBalanceDto,
    @Req() req: Request,
  ) {
    const existUserBalance = await this.userBalanceService.increase(req[FieldList.User]._id, dto);
    return fillObject(UserBalanceRdo, existUserBalance);
  }

  /** Списание с баланса */
  @ApiCreatedResponse({
    description: 'Current balance',
    type: UserBalanceRdo
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiUnauthorizedResponse({ description: 'To change the balance you need to be the creator of the workout.' })
  @ApiNotFoundResponse({ description: 'Training not found.' })
  @ApiNotFoundResponse({ description: 'Nothing to write off.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('dec')
  public async decrease(
    @Body() dto: UpdateUserBalanceDto,
    @Req() req: Request
  ) {
    const existUserBalance = await this.userBalanceService.decrease(req[FieldList.User]._id, dto);
    return fillObject(UserBalanceRdo, existUserBalance);
  }

  /** Запрос баланса пользователем */
  @ApiOkResponse({
    type: [UserBalanceRdo],
    description: 'Balance found'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.OK)
  @Get('index')
  public async index(@Req() req: Request) {
    const userBalances = await this.userBalanceService.index(req[FieldList.User]._id);
    return fillObject(UserBalanceRdo, userBalances);
  }

  /** Запрос баланса пользователем по id */
  @ApiOkResponse({
    type: [UserBalanceRdo],
    description: 'Balance found'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.OK)
  @Get('info/:id')
  public async show(@Req() req: Request, @Param('id', MongoidValidationPipe) id: string) {
    const userBalances = await this.userBalanceService.show(req[FieldList.User]._id, id);
    return fillObject(UserBalanceRdo, userBalances);
  }
}
