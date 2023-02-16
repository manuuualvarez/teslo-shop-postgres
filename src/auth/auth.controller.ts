import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeader } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidUserRoles } from './interfaces/valid-user-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('signin')
  signInUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeader() rawHeaders: string[]
  ) {
    return {
      ok: true,
      message: 'You are authorized to access this route',
      user,
      userEmail,
      rawHeaders
    }
  }

  
  @Get('role-not-authorized-example')
  // Was replaced by custom decorator
  // @SetMetadata('roles', ['admin', 'super-user'])
  // ! This is the custom decorator to validate user roles
  @RoleProtected(ValidUserRoles.superUser)
  // ! This is the custom decorator to validate user auth
  @UseGuards(AuthGuard(), UserRoleGuard )
  roleNotAuthorizedExample(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      message: 'You are authorized to access this route',
      user,
    }
  }


  @Get('unique-decorator')
  // Was replaced by custom decorator Auth
  @Auth(ValidUserRoles.admin)
  uniqueDecoratorExample(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      message: 'You are authorized to access this route',
      user,
    }
  }
}
