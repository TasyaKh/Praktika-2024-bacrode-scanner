import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("document")
export class Document {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date_create: Date;

  @Column()
  name: string;
}
