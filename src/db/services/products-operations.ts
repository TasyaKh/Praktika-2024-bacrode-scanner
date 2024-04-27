import { DataSource, Repository } from "typeorm/browser";
import { ProductOperations } from "../entities/product-operations.entity.ts";
import { ProductOperationsDto } from "../dto/product-operations.dto.ts";

export class ProductsOperationsService {
  private productOperationsRepository?: Repository<ProductOperations>;

  constructor(appDataSource: DataSource | null) {
    this.productOperationsRepository = appDataSource?.getRepository(ProductOperations);
  }

  async create(prOpDto: ProductOperationsDto) {
    return await this.productOperationsRepository?.save({
      ...prOpDto
    });
  }

  async findProductsOperations(prOpDto: ProductOperationsDto) {

    let query = this.productOperationsRepository?.createQueryBuilder("product_operations")
      .addSelect(["product_operations.id", "product_operations.count", "product.id", "product.code", "product.name"])
      .leftJoin("product_operations.product", "product")
      .leftJoin("product_operations.document", "document");

    // id_document
    prOpDto.id_document ? query.andWhere("document.id = :id_document", { id_document: prOpDto.id_document }) : null;

    return await query.getManyAndCount();
  }

  async findOne(id: number) {
    return await this.productOperationsRepository?.createQueryBuilder("product_operations")
      .where({ id: id })
      .getOne();
  }

  async update(id: number, prOpDto: ProductOperationsDto) {

    return this.productOperationsRepository?.update(id, { ...prOpDto });
  }

  async delete(id: number) {
    return await this.productOperationsRepository?.delete(id);
  }
}
