import { DataSource } from 'typeorm/browser';
import { Product } from "../db/entities/product.entity";
import { Document } from "../db/entities/document.entity";
import { Auto1714123889384 } from "../migrations/1714123889384-auto";

export const AppDataSource = new DataSource({
  type: "react-native",
  database: "barcode_scanner",
  location: "default",
  logging: true,
  synchronize: false,
  migrations:[Auto1714123889384],
  entities: [Product, Document]
});


