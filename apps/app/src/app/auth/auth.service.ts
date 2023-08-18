import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenPayload, User, UserFiles } from '@fit-friends-1/shared/app-types';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@fit-friends-1/shared/configs';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload, fillObject } from '@fit-friends-1/util/util-core';
import * as crypto from 'node:crypto';
import { UserMessage } from './auth.constant';
import { FileService } from '../file/file.service';
import { UserRdo } from '../user/rdo/user.rdo';

@Injectable()
export class AuthService {
  constructor(
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) { }

  /** Регистрация пользователя*/
  public async register(authorization: string, dto: CreateUserDto, files: UserFiles) {
    const { email, password } = dto;

    const payload = await this.verifyToken(authorization);
    if (payload) {
      throw new BadRequestException(UserMessage.AuthorizedUser);
    }

    const user = {
      ...dto,
      passwordHash: '',
      createdAt: new Date(),
      certificate: [],
    };

    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException('email ' + UserMessage.EmailExists);
    }
    const userEntity = await new UserEntity(user).setPassword(password);

    if (files?.avatar) {
      const document = await this.fileService.save(files?.avatar[0]);
      userEntity.avatar = document._id;
    }

    await this.userRepository.create(userEntity);
    const newUser = await this.userRepository.findByEmail(userEntity.email);
    const loggedUser = await this.createToken(newUser);
    return { ...loggedUser, user: fillObject(UserRdo, newUser) };
  }

  /** Вход пользователя*/
  public async login(authorization: string, dto: LoginUserDto) {
    const payload = await this.verifyToken(authorization);
    if (payload) {
      return;
    }
    const verifiedUser = await this.verify(dto);
    const loggedUser = await this.createToken(verifiedUser);
    return { ...loggedUser, user: fillObject(UserRdo, verifiedUser) };
  }

  /** Проверка пароля*/
  public async verify(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(UserMessage.NotFound);
    }

    const userEntity = new UserEntity(existUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(UserMessage.PasswordWrong);
    }

    return userEntity.toObject();
  }

  /** Генерация токена */
  public async createToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.deleteUserSession(user._id);
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }

  /** Проверка токена */
  public async verifyToken(authorization: string): Promise<TokenPayload> {
    try {
      return await this.jwtService.verifyAsync(this.getToken(authorization));
    }
    catch {
      return;
    }
  }

  /** Извлечение токена */
  public getToken(authorization: string): string {
    return authorization.split(' ')[1];
  }
}
