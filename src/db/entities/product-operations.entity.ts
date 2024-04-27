import {
  Column,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Document } from "./document.entity";
import { Product } from "./product.entity";

@Entity('product_operations')
export class ProductOperations {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  count:number

  @Column()
  fact:number

  @ManyToOne(() => Product, (p) => p.id)
  @JoinColumn([{ name: 'id_product' }])
  product: Product;

  @ManyToOne(() => Document, (d) => d.id)
  @JoinColumn([{ name: 'id_document' }])
  document: Document;
}
