import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards, Query, Body, UploadedFiles, UseInterceptors, Patch, Req } from '@nestjs/common';
import { fillObject } from '@fit-friends-1/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRdo } from './rdo/user.rdo';
import { UserService } from './user.service';
import { FileValidationPipe, MongoidValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { UserQuery } from './query/user.query';
import { JwtUserGuard } from '../auth/guards/jwt-user.guard';
import { UserFiles } from '@fit-friends-1/shared/app-types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return fillObject(UserRdo, existUser);
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
    return fillObject(UserRdo, existUsers);
  }

  /** Обновление информации о пользователе */
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user exist.'
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
    const newUser = await this.userService.update(req['user'], dto, files);
    return fillObject(UserRdo, newUser);
  }
}
