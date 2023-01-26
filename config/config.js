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
});

// Load environment dependent configuration
const env = config.get("env");

// TODO work in progress automatically select .env or .env.test
// const envFile = env === "local" ? `env` : `env.${env}`;
// const envPath = url.fileURLToPath(new URL(`./../.${envFile}`, import.meta.url));
// dotenv.config({ path: envPath });

config.loadFile(
  url.fileURLToPath(new URL(`./config.${env}.json`, import.meta.url))
);

// console.log("envPath", envPath);
console.log("The environment (NODE_ENV) is:", env);
console.log('The value of the "db.host" is:', config.get("db.host"));

// Perform validation
config.validate();

export default config;
