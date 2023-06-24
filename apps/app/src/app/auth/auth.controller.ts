import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@fit-friends-1/util/util-core';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { MongoidValidationPipe } from '@project/shared/shared-pipes';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) { }

  /** Регистрация пользователя*/
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  /** Вход пользователя*/
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verify(dto);
    const loggedUser = await this.authService.createToken(verifiedUser);
    const result = fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
    return result;
  }

  /** Информация о пользователе*/
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.get(id);
    const result = fillObject(UserRdo, existUser);
    return { ...result };
  }
}
