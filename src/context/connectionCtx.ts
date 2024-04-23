import { createContext } from "react";
import { ProductsService } from "../db/services/products.ts";
import { DocumentsService } from "../db/services/documents.ts";
import { ProductOperations } from "../db/entities/product-operations.entity.ts";
import { ProductsOperationsService } from "../db/services/products-operations.ts";

interface DatabaseConnectionContextData{
  prService:ProductsService
  productOpService:ProductsOperationsService
  docService:DocumentsService
}

export const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData, )
