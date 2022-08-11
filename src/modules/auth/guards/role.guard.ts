import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (
      !request.headers.authorization ||
      !request.headers.authorization.split('Bearer ')[1]
    )
      return false;
    const token = request.headers.authorization.split('Bearer ')[1];
    const decodded = this.authService.verifyJWT(token);
    if (!decodded) {
      return false;
    }
    const user =
      request.user || (await this.authService.getAccountFromJWT(token));
    if (!user) return false;
    if (!request.user) request.user = user;
    if (!request.jwToken) request.jwToken = token;
    return roles.indexOf(user.type) > -1;
  }
}
