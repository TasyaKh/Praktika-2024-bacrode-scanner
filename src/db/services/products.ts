import { DataSource, Repository } from "typeorm/browser";
import { Product } from "../entities/product.entity.ts";
import { ProductDto } from "../dto/product.dto.ts";
import { Document } from "../entities/document.entity.ts";

export class ProductsService {
  private productRepository?: Repository<Product>;
  private documentRepository?: Repository<Document>;

  constructor(appDataSource: DataSource | null) {

    this.productRepository = appDataSource?.getRepository(Product);
    this.documentRepository = appDataSource?.getRepository(Document);
  }

  async create(prDto: ProductDto) {
    let document:Document = null;

    if (prDto.id_document)
      document = await this.documentRepository.findOneBy({ id: prDto.id_document });

    return await this.productRepository?.save({
      ...prDto,
      document: document
    });
  }

  async findProducts(prDto: ProductDto) {

    let query = this.productRepository?.createQueryBuilder("product")
      .addSelect(["product.id", "product.code"])
      .leftJoin("product.document", "document");

    // id_document
    prDto.id_document ? query.andWhere("document.id = :id_document", { id_document: prDto.id_document }) : null;
    // code
    prDto.code ? query.andWhere("product.code = :code", { code: prDto.code }) : null;

    return await query.getManyAndCount();
  }

  async findOne(id: number) {
    return await this.productRepository?.createQueryBuilder("product")
      .where({ id: id })
      .getOne();
  }

  async update(id: number, prDto: ProductDto) {

    return this.productRepository?.update(id, { ...prDto });
  }

  async delete(id: number) {
    return await this.productRepository?.delete(id);
  }
}
