import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors, UploadedFile, Req, Patch, Param, NotFoundException, UnauthorizedException, Get, Query, Delete } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiBadRequestResponse, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FriendService } from './friend.service';
import { FriendRdo } from './rdo/friend.rdo';
import { MongoidValidationPipe, VideoValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';

@ApiTags('friend')
@Controller('friend')
export class FriendController {
  constructor(
    private readonly friendService: FriendService,
  ) { }

  /**  Создание новой тренировки 
  @ApiCreatedResponse({
    description: 'The new Friend has been successfully created.',
    type: FriendRdo
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
    @Body() dto: FriendCreateDto,
    @Req() req: Request,
    @UploadedFile(VideoValidationPipe) video: Express.Multer.File
  ) {
    const newFriend = await this.FriendService.create(req['user']._id, dto, video);
    return fillObject(FriendRdo, newFriend);
  }*/

  /**  Редактирование тренировки 
  @ApiOkResponse({
    description: 'The new Friend has been successfully updated.',
    type: FriendRdo
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'Friend not exist.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(JwtCoachGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async update(
    @Body() dto: FriendUpdateDto,
    @Req() req: Request,
    @UploadedFile(VideoValidationPipe) video: Express.Multer.File,
    @Param('id', MongoidValidationPipe) id: string
  ) {
    const existFriend = await this.FriendService.show(id);
    if (!existFriend) {
      throw new NotFoundException('Friend not exist');
    }
    if (existFriend.coachId.toString() !== req['user']._id.toString()) {
      throw new UnauthorizedException('Тo editing permissions');
    }
    const Friend = await this.FriendService.update(
      new FriendEntity(existFriend),
      dto,
      video
    );
    return fillObject(FriendRdo, Friend);
  }*/

  /** Информация о тренировке
  @ApiOkResponse({
    description: 'The exist Friend.',
    type: FriendRdo
  })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'Friend not exist.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existFriend = await this.FriendService.show(id);
    if (!existFriend) {
      throw new NotFoundException('Friend not exist');
    }
    return fillObject(FriendRdo, existFriend);
  } */

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
  @Get(':id')
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
