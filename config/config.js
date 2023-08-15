import dotenv from "dotenv";
dotenv.config();
import convict from "convict";
import * as url from "url";

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
      default: "127.0.0.1", // 2023-06 If "localhost" mysql2 connects to mysql database via ::1:3306 which does not work Ref: https://github.com/sidorares/node-mysql2/issues/1840
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
      default: 0, // Sending in port 0 is a feature in node.js which grabs a random available port number, useful for test runs // 3306
      env: "PORT",
    },
    ssl: {
      doc: "If true then use certificate file",
      format: Boolean,
      default: false,
    },
    ssl_ca: {
      doc: "The certificate file path. The file must be added to .gitignore",
      format: String,
      default: "./data/DigiCertGlobalRootCA.crt.pem",
    },
  },
  cloud: {
    id: {
      doc: "The Elastic cloud id",
      format: String,
      default: "store me in a place for senstive data, not here",
      env: "ELASTIC_CLOUD_ID",
    },
  },
  auth: {
    username: {
      doc: "The Elastic cloud username",
      format: String,
      default: "store me in a place for senstive data, not here",
      env: "ELASTIC_USERNAME",
    },
    password: {
      doc: "The Elastic cloud password",
      default: "store me in a place for senstive data, not here",
      env: "ELASTIC_PASSWORD",
    },
  },
});

// Load environment dependent configuration
const env = config.get("env");

// TODO work in progress automatically select .env or .env.test
// const envFile = env === "local" ? `env` : `env.${env}`;
// const envPath = url.fileURLToPath(new URL(`./../.${envFile}`, import.meta.url));
// dotenv.config({ path: envPath });

config.loadFile(url.fileURLToPath(new URL(`./config.${env}.json`, import.meta.url)));

// console.log("envPath", envPath);
console.log("[LOG] The environment (NODE_ENV) is:", env);
console.log('[LOG] The value of the "db.host" is:', config.get("db.host"));
console.log('[LOG] The value of the "db.port" is:', config.get("db.port"));

// Perform validation
config.validate();

export default config;
