import dotenv from "dotenv";
dotenv.config();
import convict from "convict";

import * as url from "url";

//addFormat(require("convict-format-with-validator").ipaddress);

// Define a schema
const config = convict({
  env: {
    doc: "Environments",
    format: ["local", "test", "production"],
    default: "local",
    env: "NODE_ENV",
    arg: "env",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: "*",
      default: "localhost",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "alpaca_database",
      env: "MYSQL_DATABASE",
    },
    user: {
      doc: "User with write access",
      format: String,
      default: "root",
      env: "MYSQL_USER",
    },
    password: {
      default: "my password",
      env: "MYSQL_PASSWORD",
    },
    port: {
      doc: "The port to bind.",
      format: "port",
      default: 3306,
      env: "PORT",
    },
  },
});

// Load environment dependent configuration
const env = config.get("env");
config.loadFile(
  url.fileURLToPath(new URL(`./config.${env}.json`, import.meta.url))
);

// Perform validation
config.validate();
//config.validate({ allowed: "strict" });

export default config;
