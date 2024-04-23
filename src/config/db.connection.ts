import { DataSource } from "typeorm/browser";
import { Product } from "../db/entities/product.entity.ts";
import { Document } from "../db/entities/document.entity.ts";
import { ProductOperations } from "../db/entities/product-operations.entity.ts";

const setupConnectionLocalDb = async () => {

  try {
    const AppDataSource = new DataSource({
      type: "react-native",
      database: "barcode_scanner",
      location: "default",
      logging: ["error", "query", "schema"],
      synchronize: true,
      entities: [Product, Document, ProductOperations]
    });

    await AppDataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    return AppDataSource;

  } catch (error) {
    console.log(error);
  }
};

export default setupConnectionLocalDb;
