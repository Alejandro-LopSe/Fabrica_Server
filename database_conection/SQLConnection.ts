import mysql from "npm:mysql2@^2.3.3/promise";

const pools = {
  local: mysql.createPool({
    host: "127.0.0.1",
    port: 8001,
    user: "root",
    password: "-Fabrica-1974",
    database: "fabrica",
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  }),
  remote: mysql.createPool({
    host: "92.191.5.86",
    port: 10001,
    user: "Admin",
    password: "-Fabrica-1974",
    database: "fabrica",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }),
};

export const MYSQL = (dbtouse: "local" | "remote" = "remote") => {
  const pool = pools[dbtouse];
  console.log(
    `\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BBDD - Pool creado para ${dbtouse} >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n`,
  );
  return pool;
};

export const db = MYSQL(); // usa remote por defecto
