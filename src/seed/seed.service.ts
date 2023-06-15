import { Injectable } from '@nestjs/common';
import { ProductsService } from "../products/products.service";
import { initialData } from "./data/seed-data";

@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductsService
  ) {
  }


  async runSeed(){
    await this.inserNewProducts();
    return "Seed executed"
  }


  private async inserNewProducts () {
    await this.productService.deleteAllProducts()

    const products = initialData.products

    const insertPromises = [];

    for (const productsKey in products) {
      insertPromises.push( this.productService.create(products[productsKey]))
    }


    await Promise.all(insertPromises)

  }
}
