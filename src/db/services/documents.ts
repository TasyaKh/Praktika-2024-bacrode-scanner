import { DataSource, Repository } from "typeorm/browser";
import { Document } from "../entities/document.entity.ts";
import { DocumentDto } from "../dto/document.dto.ts";

export class DocumentsService {
  private documentRepository?: Repository<Document>;

  constructor(appDataSource: DataSource | null) {
    this.documentRepository = appDataSource?.getRepository(Document);
  }

  async create(docDto: DocumentDto) {
    return await this.documentRepository?.save({
      ...docDto,
      date_create:new Date()
    });
  }

  async findDocuments(docDto: DocumentDto) {

    let query = this.documentRepository?.createQueryBuilder("document")
      .addSelect(["document.id", "document.date_create"]);

    return await query.getManyAndCount();
  }

  async findOne(id: number) {
    return await this.documentRepository?.createQueryBuilder("document")
      .where({ id: id })
      .getOne();
  }

  async update(id: number, docDto: DocumentDto) {
    return this.documentRepository?.update(id, { ...docDto});
  }

  async delete(id: number) {
    // console.log("delete ", id);
    return await this.documentRepository?.delete(id);
  }
}
