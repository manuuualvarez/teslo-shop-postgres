import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, ParseFilePipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidUserRoles } from 'src/auth/interfaces/valid-user-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { use } from 'passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth()
  // * Swagger
  @ApiResponse( { status: 201, description: 'The product has been successfully created.', type: Product })
  @ApiResponse( { status: 400, description: 'Bad request' })
  @ApiResponse( { status: 403, description: 'Token invalid' })
  create(
    @Body() createProductDto: CreateProductDto,
    // ! Use a custom decorator to get User
    @GetUser() user: User
  ){
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidUserRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProductDto: UpdateProductDto,
    // ! Use a custom decorator to get User
    @GetUser() user: User
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @Auth(ValidUserRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
