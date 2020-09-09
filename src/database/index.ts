import { Connection, getConnectionOptions, createConnection } from "typeorm";

const Database = {
  init: async (): Promise<Connection> => {
    const options = await getConnectionOptions(
      process.env.NODE_ENV || "development"
    );
    return await createConnection({ ...options, name: "default" });
  },
};

export default Database;
