import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards, Query } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRdo } from './rdo/user.rdo';
import { UserService } from './user.service';
import { MongoidValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { UserQuery } from './query/user.query';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  /** Информация о пользователе*/
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.userService.getUser(id);
    const result = fillObject(UserRdo, existUser);
    return { ...result };
  }

  /** Список пользователей */
  @ApiResponse({
    type: Array<UserRdo>,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  public async index(@Query() query: UserQuery) {
    const existUsers = await this.userService.index(query);
    const result = fillObject(UserRdo, existUsers);
    return { ...result };
  }
}
