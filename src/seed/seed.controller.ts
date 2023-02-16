import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidUserRoles } from 'src/auth/interfaces/valid-user-roles';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}


  @Get()
  @Auth(ValidUserRoles.superUser)
  executeSeed() {
    return this.seedService.runSeed();
  }
}
