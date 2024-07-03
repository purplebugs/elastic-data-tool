import config from "../../config/config.js";
import pkg from "mysql2/promise";

import { readFileSync } from "fs";

const dbOptions = {
  host: config.get("db.host"),
  database: config.get("db.name"),
  user: config.get("db.user"),
  password: config.get("db.password"),
  port: config.get("db.port"),
  ssl: config.get("db.ssl")
    ? { ca: readFileSync(config.get("db.ssl_ca")) }
    : false,
  // socketPath: "/tmp/mysql.sock", // 2023-06 If connect with socket and need to know path use command: mysql -u root -p -h 127.0.0.1 -e "select @@socket"
};

export const connectToDb = async () => {
  let connection = null;
  const mysqlPromise = pkg; // get the client

  // console.log("dbOptions", dbOptions);
  // create the connection
  connection = await mysqlPromise.createConnection(dbOptions);

  return connection;
};
