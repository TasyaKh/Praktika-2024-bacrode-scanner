import { AppDataSource } from "./typeorm.config.ts";
import { DataSource } from "typeorm/browser";

const setupConnectionLocalDb = async () => {

  try {
    let dSource: DataSource = null;
    await AppDataSource.initialize()
      .then((dataSource) => {
        console.log("Data Source has been initialized!");
        dSource = dataSource;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    // await dSource.dropDatabase()
    // init database
    await dSource.runMigrations();

    return AppDataSource;

  } catch (error) {
    console.log("error", error.log);
  }
};

export default setupConnectionLocalDb;
