import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

// This constructor is needed to inject the Reflector service, and know the metadata of the route
constructor(
  private readonly reflector: Reflector
) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] =  this.reflector.get('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    

    if(!user) {
      throw new BadRequestException('User not found');
    }

    for (const role of user.role) {
      if (validRoles.includes(role)) {
        return true;
      }
    }

    throw new ForbiddenException(`User ${ user.firstName } ${ user.lastName } not authorized user role`);
    
  }
}
