// import { PagesService } from "../db/chapters";
import { createContext } from "react";

interface DatabaseConnectionContextData{
  // chaptersRepo:PagesService
}

export const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData, )
