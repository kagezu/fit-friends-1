import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtUserGuard extends AuthGuard('jwt-user') { }
