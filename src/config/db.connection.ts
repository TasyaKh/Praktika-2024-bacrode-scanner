import { DataSource } from "typeorm/browser";

const setupConnectionLocalDb = async () => {

  try {
    const AppDataSource = new DataSource({
      type: "react-native",
      database: "enen",
      location: "default",
      logging: ["error", "query", "schema"],
      synchronize: false,
      entities: []
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

export default setupConnectionLocalDb
