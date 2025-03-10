import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

// ✅ Define user type
interface User {
  id: string;
  role: string;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (!requiredRole) return true; // No role required, allow access

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User; // Extract user from JWT payload
    console.log("user: ", user);

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.role !== requiredRole) {
      throw new ForbiddenException(`Only ${requiredRole}s can access this route`);
    }

    return true;
  }
}
