import {
  Column,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Document } from "./document.entity.ts";

@Entity('product')
export class Product {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  code:string

  // @Column()
  // price:string
}
