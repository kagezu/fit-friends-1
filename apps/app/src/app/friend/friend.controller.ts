import { Controller, HttpCode, HttpStatus, Post, UseGuards, Req, Param, Get, Delete } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiConflictResponse, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FriendService } from './friend.service';
import { FriendRdo } from './rdo/friend.rdo';
import { MongoidValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';

@ApiTags('friend')
@Controller('friend')
export class FriendController {
  constructor(
    private readonly friendService: FriendService,
  ) { }

  /** Добавление друга */
  @ApiCreatedResponse({
    description: 'New friend added successfully.',
    type: FriendRdo
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiConflictResponse({ description: 'The friend exist.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(':id')
  public async create(
    @Param('id', MongoidValidationPipe) id: string,
    @Req() req: Request
  ) {
    const existFriend = await this.friendService.create(req['user']._id, id);
    return fillObject(FriendRdo, existFriend);
  }

  /** Удаление друга */
  @ApiCreatedResponse({
    description: 'New friend added successfully.',
    type: FriendRdo
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Friend not exist.' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Delete(':id')
  public async delete(
    @Param('id', MongoidValidationPipe) id: string,
    @Req() req: Request
  ) {
    const existFriend = await this.friendService.destroy(req['user']._id, id);
    return fillObject(FriendRdo, existFriend);
  }

  /** Список друзей */
  @ApiOkResponse({
    type: [FriendRdo],
    description: 'Friend found'
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
    const existFriends = await this.friendService.index(req['user']._id);
    return fillObject(FriendRdo, existFriends);
  }
}
