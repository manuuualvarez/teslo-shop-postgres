import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {

constructor(
  private readonly productsService: ProductsService
) {}

  async runSeed() {
    await this.insertNewProducts();
    return 'Fill Executed';
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    const insertPriomises = [];

    products.forEach(product => {
      insertPriomises.push(this.productsService.create(product));
    });

    await Promise.all(insertPriomises);

    return true;
  }

}
