import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidUserRoles } from '../interfaces/valid-user-roles';
import { RoleProtected } from './role-protected/role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';

export function Auth(...roles: ValidUserRoles[]) {
  return applyDecorators(
    /// Use custom decorator to validate roles
    RoleProtected(...roles),
    // Use custom decorator and guard to validate auth
    UseGuards(AuthGuard(), UserRoleGuard),

  );
}