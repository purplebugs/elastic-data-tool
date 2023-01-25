import pkg from "convict";
const { addFormat } = pkg;

addFormat(require("convict-format-with-validator").ipaddress);

// Define a schema
const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
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
      env: "MYSQL_DATABASE",
    },
    user: {
      doc: "User with write access",
      format: String,
      env: "MYSQL_USER",
    },
    password: {
      env: "MYSQL_PASSWORD",
    },
  },
  admin: {
    doc: "User with write access",
    format: String,
    default: "root",
  },
});

// Load environment dependent configuration
const env = config.get("env");
config.loadFile("./config/" + env + ".json");

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
