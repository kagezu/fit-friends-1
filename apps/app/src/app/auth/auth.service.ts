import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenPayload, User, UserFiles, UserRole } from '@fit-friends-1/shared/app-types';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@fit-friends-1/shared/configs';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@fit-friends-1/util/util-core';
import * as crypto from 'node:crypto';
import { MAX_TRAINING_TYPES, UserMassage } from './auth.constant';
import { FileService } from '../file/file.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  /** Регистрация пользователя*/
  public async register(dto: CreateUserDto, { avatar, certificate }: UserFiles) {
    const { role, email, password } = dto;

    const user = {
      ...dto,
      passwordHash: '',
      createdAt: new Date(),
      trainingTypes: Array.from(new Set<string>(dto.trainingTypes)).slice(0, MAX_TRAINING_TYPES)
    };

    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(UserMassage.EmailExists);
    }
    const userEntity = await new UserEntity(user).setPassword(password);

    if (avatar[0]) {
      const document = await this.fileService.save(avatar[0]);
      userEntity.avatar = document._id;
    }

    if (role === UserRole.Coach) {
      const document = await this.fileService.save(certificate[0]);
      userEntity.certificate = document._id;
    }

    return this.userRepository.create(userEntity);
  }

  /** Проверка пароля*/
  public async verify(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(UserMassage.NotFound);
    }

    const userEntity = new UserEntity(existUser);
    if (!await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(UserMassage.PasswordWrong);
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
