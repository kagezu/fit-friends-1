import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Headers, Req, BadRequestException, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@fit-friends-1/util/util-core';
import { UserRdo } from '../user/rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiConsumes, ApiCreatedResponse, ApiHeader, ApiProperty, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RequestWithUser, UserFiles } from '@fit-friends-1/shared/app-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { UserMessage } from './auth.constant';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '@fit-friends-1/shared/shared-pipes';
import { UserFilesUploadDto } from './dto/user-files-upload.dto';

class TokensResponse {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  /** Регистрация пользователя*/
  @ApiCreatedResponse({ description: 'The new user has been successfully created.' })
  @ApiConflictResponse({ description: 'The user exist.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    description: 'Attached files',
    type: UserFilesUploadDto
  })
  @ApiBody({ type: CreateUserDto })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'certificate', maxCount: 1 }
  ]))
  @Post('register')
  public async create(
    @Body() dto: CreateUserDto,
    @Headers('authorization') authorization: string,
    @UploadedFiles(new FileValidationPipe()) files: UserFiles
  ) {
    const payload = await this.authService.verifyToken(authorization);
    if (payload) {
      throw new BadRequestException(UserMessage.AuthorizedUser);
    }

    const newUser = await this.authService.register(dto, files);
    return fillObject(UserRdo, newUser);
  }

  /** Вход пользователя*/
  @ApiCreatedResponse({
    type: LoggedUserRdo,
    description: 'User has been successfully logged.'
  })
  @ApiUnauthorizedResponse({ description: 'Password or Login is wrong.' })
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  public async login(@Body() dto: LoginUserDto, @Headers('authorization') authorization: string) {
    const payload = await this.authService.verifyToken(authorization);
    if (payload) {
      throw new BadRequestException(UserMessage.AuthorizedUser);
    }
    const verifiedUser = await this.authService.verify(dto);
    const loggedUser = await this.authService.createToken(verifiedUser);
    const result = fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
    return result;
  }

  /** Генерация нового токена */
  @ApiUnauthorizedResponse({ description: 'Bad refresh token' })
  @ApiCreatedResponse({ type: TokensResponse, description: 'Get a new access/refresh tokens' })
  @ApiHeader({
    name: 'authorization',
    description: 'Refresh token'
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createToken(user);
  }
}
