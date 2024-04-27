import { DataSource, Repository } from "typeorm/browser";
import { Document } from "../entities/document.entity.ts";
import { DocumentDto } from "../dto/document.dto.ts";

export class DocumentsService {
  private documentRepository?: Repository<Document>;

  constructor(appDataSource: DataSource | null) {
    this.documentRepository = appDataSource?.getRepository(Document);
  }

  async create(docDto: DocumentDto) {

    let name = docDto.name
    // Get the current maximum ID
    if(!name){
      const maxIdResult = await this.documentRepository.maximum("id")
      const maxId = maxIdResult || 0;

      // Generate the document name
      name = `Документ ${maxId + 1}`;
    }

    return await this.documentRepository?.save({
      name: name,
      date_create: new Date()
    }).catch((err) => {
      console.log(err)
    })
  }

  async findDocuments(docDto: DocumentDto) {

    let query = this.documentRepository?.createQueryBuilder("document")
      .addSelect(["document.id", "document.date_create", "document.name"])
      .orderBy("document.date_create", "DESC")

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
    return await this.documentRepository?.delete(id);
  }

  async deleteAll() {
    return await this.documentRepository?.createQueryBuilder("document").delete().execute();
  }
}
