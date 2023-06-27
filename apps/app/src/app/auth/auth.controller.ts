import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Headers, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@fit-friends-1/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from '@fit-friends-1/shared/app-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { UserMassage } from './auth.constant';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  /** Регистрация пользователя*/
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The user exist.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto, @Headers('authorization') authorization: string) {
    const payload = await this.authService.verifyToken(authorization);
    if (payload) {
      throw new BadRequestException(UserMassage.AuthorizedUser);
    }

    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  /** Вход пользователя*/
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.CREATED,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  public async login(@Body() dto: LoginUserDto, @Headers('authorization') authorization: string) {
    const payload = await this.authService.verifyToken(authorization);
    if (payload) {
      throw new BadRequestException(UserMassage.AuthorizedUser);
    }
    const verifiedUser = await this.authService.verify(dto);
    const loggedUser = await this.authService.createToken(verifiedUser);
    const result = fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
    return result;
  }

  /** Генерация нового токена */
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createToken(user);
  }
}
