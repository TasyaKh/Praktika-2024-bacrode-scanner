import { DataSource, Repository } from "typeorm/browser";
import { Product } from "../entities/product.entity.ts";
import { ProductDto } from "../dto/product.dto.ts";

export class ProductsService {
  private productRepository?: Repository<Product>;

  constructor(appDataSource: DataSource | null) {

    this.productRepository = appDataSource?.getRepository(Product);
    // console.log("database commection", appDataSource  ? "true" : "false");
    // console.log("this.productRepository ", this.productRepository);
  }

  async create(prDto: ProductDto) {
    return await this.productRepository?.save({
      ...prDto
    });
  }

  async findProducts(prDto: ProductDto) {

    let query = this.productRepository?.createQueryBuilder("product")
      .addSelect(["product.id", "product.code"]);

    prDto.code ? query.andWhere("product.code = :code", { code: prDto.code }) : null;

    return await query.getManyAndCount();
  }

  async findOne(id: number) {
    return await this.productRepository?.createQueryBuilder("product")
      .where({ id: id })
      .getOne();
  }

  async update(id: number, prDto: ProductDto) {

    return this.productRepository?.update(id, { ...prDto});
  }

  async delete(id: number) {
    return await this.productRepository?.delete(id);
  }
}
