import { DataSource, Repository } from "typeorm/browser";
import { ProductDto } from "../dto/product.dto.ts";
import { ProductOperations } from "../entities/product-operations.entity.ts";

export class ProductsOperationsService {
  private productOperationsRepository?: Repository<ProductOperations>;

  constructor(appDataSource: DataSource | null) {
    this.productOperationsRepository = appDataSource?.getRepository(ProductOperations);
  }

  async create(prOpDto: ProductOperations) {
    return await this.productOperationsRepository?.save({
      ...prOpDto
    });
  }

  async findProductsOperations(prOpDto: ProductOperations) {

    let query = this.productOperationsRepository?.createQueryBuilder("product_operations")
      .addSelect(["product_operations.id", "product_operations.count", "product_operations.code"])
      .leftJoinAndSelect("product_operations.product", "product")

    return await query.getManyAndCount();
  }

  async findOne(id: number) {
    return await this.productOperationsRepository?.createQueryBuilder("product_operations")
      .where({ id: id })
      .getOne();
  }

  async update(id: number, prDto: ProductDto) {

    return this.productOperationsRepository?.update(id, { ...prDto});
  }

  async delete(id: number) {
    return await this.productOperationsRepository?.delete(id);
  }
}
