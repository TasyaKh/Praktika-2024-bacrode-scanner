import React, { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { DataSource } from "typeorm/browser";
import { DatabaseConnectionContext } from "../context/connectionCtx";
// import { PagesService } from "../db/chapters.ts";
import setupConnectionLocalDb from "../config/db.connection";
import { ActivityIndicator } from "react-native";

interface Props {
  children: ReactNode;
}

export const DatabaseConnectionProvider: React.FC<Props> = ({ children }) => {
  const [connection, setConnection] = useState<DataSource | null>(null);

  const connect = useCallback(async () => {
    try {
      await setupConnectionLocalDb().then((createdConnection) => {
        setConnection(createdConnection);
        // createdConnection.dropDatabase()
      });

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }

  }, [connect, connection]);


  if (!connection) {
    return <ActivityIndicator />;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        // chaptersRepo: new PagesService(connection)
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  return useContext(DatabaseConnectionContext);
}
