import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenPayload, User } from '@fit-friends-1/shared/app-types';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@fit-friends-1/shared/configs';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@fit-friends-1/util/util-core';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  /** Регистрация пользователя*/
  public async register(dto: CreateUserDto) {
    const { name, email, password, role } = dto;

    const user = {
      name,
      email,
      avatar: '',
      passwordHash: '',
      gender: '',
      birthday: '',
      role,
      description: '',
      location: '',
      background: '',

      trainingLevel: '',
      trainingType: [],

      interval: '',
      caloriesToBurn: 0,
      caloriesPerDay: 0,
      readyForTraining: false,

      certificate: '',
      meritsOfCoach: '',
      readyForIndividualTraining: false
    };

    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user).setPassword(password);
    return this.userRepository.create(userEntity);
  }

  /** Проверка пароля*/
  public async verify(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return userEntity.toObject();
  }

  /** Информация о пользователе*/
  public async getUser(id: string) {
    return this.userRepository.findById(id);
  }

  /** Генерация токена */
  public async createToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }

  /** Извлечение из токена */
  // public async getPayload(authorization: string): Promise<TokenPayload> {
  //   const payload = this.jwtService.decode(this.getToken(authorization));
  //   return payload as unknown as TokenPayload;
  // }

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
