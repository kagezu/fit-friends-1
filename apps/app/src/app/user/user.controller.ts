import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards, Query, Body, UploadedFiles, UseInterceptors, Patch, Req } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRdo } from './rdo/user.rdo';
import { UserService } from './user.service';
import { FileValidationPipe, MongoidValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { UserQuery } from './query/user.query';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';
import { FieldList, UserFiles } from '@fit-friends-1/shared/app-types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilesUploadDto } from '../auth/dto/user-files-upload.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  /** Информация о пользователе*/
  @ApiOkResponse({
    type: UserRdo,
    description: 'User found'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('info/:id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.userService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

  /** Информация о ауторизированом пользователе*/
  @ApiOkResponse({
    type: UserRdo,
    description: 'User found'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  public async check(@Req() req: Request) {
    return fillObject(UserRdo, req[FieldList.User]);
  }

  /** Список пользователей */
  @ApiOkResponse({
    type: [UserRdo],
    description: 'Users found'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @ApiQuery({
    description: 'Query options',
    type: UserQuery
  })
  @UseGuards(JwtUserGuard)
  @HttpCode(HttpStatus.OK)
  @Get('index')
  public async index(@Query() query: UserQuery) {
    const existUsers = await this.userService.index(query);
    return fillObject(UserRdo, existUsers);
  }

  /** Обновление информации о пользователе */
  @ApiCreatedResponse({
    type: UserRdo,
    description: 'The new user has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    description: 'Attached files',
    type: UserFilesUploadDto
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Access token'
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'certificate', maxCount: 1 }
  ]))
  @Patch('update')
  public async create(
    @Body() dto: UpdateUserDto,
    @UploadedFiles(new FileValidationPipe()) files: UserFiles,
    @Req() req: Request
  ) {
    const user = await this.userService.update(req[FieldList.User], dto, files);
    return fillObject(UserRdo, user);
  }
}
