import {
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity('document')
export class Document {

  @PrimaryGeneratedColumn()
  id:number;

  @CreateDateColumn()
  date_create:Date

  @ManyToOne(() => Document, (ch) => ch.id)
  @JoinColumn([{ name: 'id_document' }])
  document: Document;
}
