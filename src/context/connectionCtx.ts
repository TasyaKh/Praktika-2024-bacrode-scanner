import { createContext } from "react";
import { ProductsService } from "../db/services/products.ts";
import { DocumentsService } from "../db/services/documents.ts";

interface DatabaseConnectionContextData{
  prService:ProductsService
  // productOpService:ProductsOperationsService
  docService:DocumentsService
}

export const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData, )
