import mysql from "npm:mysql2@^2.3.3/promise";
const usedb = async (dbtouse: string) => {
  try {
    if (dbtouse === "local") {
      const DB = await mysql.createConnection({
        "host": "127.0.0.1",
        "port": 8001,
        "user": "root",
        "password": "-Fabrica-1974",
      });
      return DB;
    } else if (dbtouse === "remote") {
      const DB = await mysql.createConnection({
        host: "92.191.5.86",
        port: 10001,
        user: "Admin",
        password: "-Fabrica-1974",
      });
      return DB;
    }
  } catch (error) {
    console.log(error);
  }
};

export const MYSQL = async function () {
  const DB = await usedb("remote");

  if (DB) {
    console.log(
      "\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BBDD - Connectado >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n",
    );
  } else {
    console.log(
      "\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BBDD - Fallo >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n",
    );
    return;
  }
  const [checkdb] = await DB.query("SHOW DATABASES;");
  //@ts-expect-error>
  const existdb = checkdb.some((e) => {
    if (e.Database === "fabrica") return true;
    return false;
  });
  //await DB.query("DROP DATABASE fabrica;")

  if (!existdb) {
    await DB.query("CREATE DATABASE fabrica;");
    console.log(
      "\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DB - creada >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n",
    );
  }

  await DB.query("use fabrica;");

  const [checktables] = await DB.query("SHOW TABLES FROM fabrica;");

  //@ts-expect-error>
  const existtables = checktables.some((e) => {
    if (
      e.Tables_in_fabrica === "clientes" || e.Tables_in_fabrica === "Clientes"
    ) return true;
    return false;
  });

  if (!existtables) {
    await DB.query(`CREATE TABLE Clientes(
      id_cliente  INT  NOT NULL AUTO_INCREMENT,
      Nombre      VARCHAR(45) NOT NULL,
      Apellidos   VARCHAR(45) NOT NULL,
      DNI         VARCHAR(45),
      Telefono    INT,
      CP          INT,
      Direccion   VARCHAR(45),
      Correo      VARCHAR(45),
      Empresa     TINYINT(1) NOT NULL,
      Fecha_Alta  VARCHAR(100) NOT NULL,
      Fecha_Baja  VARCHAR(100) ,
      Fecha_mod   VARCHAR(100),
      Activo      TINYINT(1)  NOT NULL,
      INDEX (nombre),
      PRIMARY KEY(id_cliente,Nombre,Apellidos,Fecha_mod)
    ) `);
    console.log(
      "\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< tabla clientes creada >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n",
    );
  }

  //@ts-expect-error>
  const existtables2 = checktables.some((e) => {
    if (
      e.Tables_in_fabrica === "usuarios" || e.Tables_in_fabrica === "Usuarios"
    ) return true;
    return false;
  });

  if (!existtables2) {
    await DB.query(`CREATE TABLE Usuarios(
      id_usuario  INT  NOT NULL AUTO_INCREMENT,
      Nombre      VARCHAR(45) NOT NULL UNIQUE,
      Password   VARCHAR(45) NOT NULL,
      INDEX (nombre),
      PRIMARY KEY(id_usuario,Nombre)
    ) `);
    console.log("tabla Usuarios creada");
    await DB.query(`
    INSERT INTO Usuarios (
        Nombre, Password
    ) 
    VALUES (
        'Admin','0201'
    );`);
    await DB.query(`
    INSERT INTO Usuarios (
        Nombre, Password
    ) 
    VALUES (
        'Esperanza','0201'
    );`);
    await DB.query(`
    INSERT INTO Usuarios (
        Nombre, Password
    ) 
    VALUES (
        'Angel','0201'
    );`);
    await DB.query(`
    INSERT INTO Usuarios (
        Nombre, Password
    ) 
    VALUES (
        'Jose','0201'
    );`);
    console.log("Usuarios creados");
  }

  if (DB) {
    console.log(
      "\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< DB Fabrica Lista >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n",
    );
  }
  return DB!;
};

export const db = await MYSQL();
