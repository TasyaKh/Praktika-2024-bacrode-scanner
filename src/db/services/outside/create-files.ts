import RNFetchBlob from "rn-fetch-blob";
import { IResult } from "../types/types.ts";

export class FilesService {
  dir: string;

  constructor() {
    this.dir = RNFetchBlob?.fs?.dirs?.DocumentDir;
  }

  async createCSVFile(name: string, type: string, csvData: any) {
    let res: IResult = {};
    // path
    const pathToWrite = `${this.dir}/${name}.${type}`;
    if (this.dir) {
      await RNFetchBlob.fs
        .writeFile(pathToWrite, csvData, "utf8")
        .then(() => {
          res.msg = "Файл создан";
        })
        .catch((error) => {
          res.err = "Ошибка при создании файла!";
        });
    } else {
      res.err = "Ошибка пути к файлу!";
    }

    console.log(res)
    return { path: pathToWrite, msg: res };
  }
}
