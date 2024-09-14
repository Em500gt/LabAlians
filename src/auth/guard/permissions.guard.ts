import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_PERMISSIONS_KEY } from '../../common/decorators/check-permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(CHECK_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const staff = request.user;
    if (staff.staffGroup.fullAccess) {
      return true;
    }
    const hasPermission = requiredPermissions.every(permission => staff.staffGroup[permission]);
    if (!hasPermission) {
      throw new ForbiddenException('You do not have the required permissions');
    }
    return hasPermission;
  }
}