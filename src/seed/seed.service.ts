import { Injectable } from "@nestjs/common";
import { ProductsService } from "../products/products.service";
import { initialData } from "./data/seed-data";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }


  async runSeed() {
    await this.deleteTables;
    const adminUser = await this.inserUsers();
    await this.inserNewProducts(adminUser);
    return "Seed executed";
  }


  private async deleteTables() {
    await this.productService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();
  }

  private async inserUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach(user => {
      users.push(this.userRepository.create({ ...user, password: bcrypt.hashSync(user.password, 10) }));
    });

    await this.userRepository.save(users);

    return users[0];
  }

  private async inserNewProducts(user: User) {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    for (const productsKey in products) {
      insertPromises.push(this.productService.create(products[productsKey], user));
    }


    await Promise.all(insertPromises);

  }
}
