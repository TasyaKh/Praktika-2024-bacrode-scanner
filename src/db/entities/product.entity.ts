import {
  Column, CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Document } from "./document.entity";

@Entity('product')
export class Product {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  code:string

  @Column({nullable:true})
  name:string

  @CreateDateColumn()
  date_create:Date

  @ManyToOne(() => Document, (d) => d.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn([{ name: 'id_document' }])
  document: Document;
}
