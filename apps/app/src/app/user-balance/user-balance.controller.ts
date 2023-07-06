import { Controller, HttpCode, HttpStatus, UseGuards, Req, Param, Get, Patch } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserBalanceService } from './user-balance.service';
import { MongoidValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';
import { UserBalanceRdo } from './rdo/user-balance.rdo';
import { JwtCoachGuard } from '../auth/guards/jwt-coach.guard';

@ApiTags('balance')
@Controller('balance')
export class UserBalanceController {
  constructor(
    private readonly userBalanceService: UserBalanceService,
  ) { }

  /** Добавление баланса тренером */
  @ApiCreatedResponse({
    description: 'Current balance',
    type: UserBalanceRdo
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Training not found.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtCoachGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id/add')
  public async increase(
    @Param('id', MongoidValidationPipe) id: string,
    @Req() req: Request
  ) {
    const existUserBalance = await this.userBalanceService.increase(req['user']._id, id, 1);
    return fillObject(UserBalanceRdo, existUserBalance);
  }

  /** Списание с баланса тренером */
  @ApiCreatedResponse({
    description: 'Current balance',
    type: UserBalanceRdo
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'No information.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtCoachGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id/dec')
  public async decrease(
    @Param('id', MongoidValidationPipe) id: string,
    @Req() req: Request
  ) {
    const existUserBalance = await this.userBalanceService.decrease(req['user']._id, id, 1);
    return fillObject(UserBalanceRdo, existUserBalance);
  }

  /** Запрос баланса */
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
  @Get('')
  public async index(@Req() req: Request) {
    const userBalances = await this.userBalanceService.index(req['user']._id);
    return fillObject(UserBalanceRdo, userBalances);
  }
}
