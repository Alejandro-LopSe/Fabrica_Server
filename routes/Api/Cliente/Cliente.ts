import { FreshContext, Handlers } from "$fresh/server.ts";
import {
  BBDD_Cliente,
  BBDD_Contacto,
  BBDD_Direccion,
  BBDD_Empresa,
} from "../../../types.ts";
import { db } from "../../../database_conection/SQLConnection.ts";

export const handler: Handlers = {
  PUT: async (req: Request, _ctx: FreshContext) => {
    const body: Partial<BBDD_Cliente> = await req.json();
    const url = new URL(req.url);
    const pag_activa: string = url.searchParams.get("pagina") || "0";

    const [exist] = await db!.query(
      `SELECT * FROM clientes WHERE (Nombre like '%${body.Nombre || ""}%' 
            AND Apellidos like '%${body.Apellidos || ""}%'
            AND DNI like '%${body.DNI || ""}%' ) AND Activo=1 LIMIT 50 OFFSET ${
        parseInt(pag_activa!) * 50
      }`,
    );
    const res = new Response(JSON.stringify(exist));

    return res;
  },

  //Añadir cliente, con dir, cont y emp opcional
  async POST(req: Request, _ctx: FreshContext) {
    console.log("POST 1 lgo");
    try {
      const body: [
        Partial<BBDD_Cliente>,
        Partial<BBDD_Direccion>,
        Partial<BBDD_Contacto>,
        Partial<BBDD_Empresa>,
        boolean,
        boolean,
      ] = await req.json();
      //clinete----------------------------------------------------------------------------
      await db!.query(
        `INSERT INTO clientes (Nombre, Apellidos, DNI,OBSERVACIONES, Activo)
        SELECT '${body[0].Nombre}', '${body[0].Apellidos}', '${body[0].DNI}','${
          body[0].OBSERVACIONES
        }', 1
        FROM DUAL
        WHERE NOT EXISTS (
          SELECT 1 FROM clientes WHERE Nombre = '${
          body[0].Nombre
        }' and Apellidos =  '${body[0].Apellidos}' and DNI = '${body[0].DNI}'
        );`,
      );
      const [cli] = await db!.query(`
        SELECT * FROM clientes
        WHERE  Nombre = '${body[0].Nombre}' and Apellidos =  '${
        body[0].Apellidos
      }' and DNI = '${body[0].DNI}'`);

      //@ts-expect-error-es tipocoorecto
      const new_cliente: BBDD_Cliente = cli[0];
      console.log(new_cliente);
      //empresa----------------------------------------------------------------------------
      if (body[5]) {
        console.log("POST 2 lgo");
        if (body[4]) {
          // NUEVA EMPRESA
          await db!.query(
            `INSERT INTO empresa (Razon_Social, CIF, OBSERVACIONES, id_cliente, Activo)
            SELECT ?, ?, ?, ?, 1
            FROM DUAL
            WHERE NOT EXISTS (
              SELECT 1 FROM empresa WHERE Razon_Social = ? AND CIF = ? 
            )`,
            [
              body[3].Razon_Social,
              body[3].CIF,
              body[3].OBSERVACIONES || "-",
              new_cliente.id_cliente,
              1,
              body[3].Razon_Social,
              body[3].CIF,
            ],
          );

          const [emp] = await db!.query(
            `SELECT * FROM empresa WHERE Razon_Social = ? AND CIF = ?`,
            [body[3].Razon_Social, body[3].CIF],
          );
          const new_empresa: BBDD_Empresa = (emp as any)[0];

          // DIRECCIÓN
          await db!.query(
            `INSERT INTO direccion (id_empresa, direccion,codigo_postal, localidad, municipio, provincia, OBSERVACIONES, Activo)
            VALUES (?, ?, ?, ?, ?, ?,?, 1)`,
            [
              new_empresa.id_empresa,
              body[1].direccion,
              body[1].codigo_postal,
              body[1].localidad,
              body[1].municipio,
              body[1].provincia,
              body[1].OBSERVACIONES || "-",
              1,
            ],
          );

          // CONTACTO
          await db!.query(
            `INSERT INTO contacto (id_empresa, Telefono, Fijo, Email, OBSERVACIONES, Activo)
            VALUES (?, ?, ?, ?, ?, 1)`,
            [
              new_empresa.id_empresa,
              body[2].Telefono,
              body[2].Fijo,
              body[2].Email,
              body[2].OBSERVACIONES || "-",
              1,
            ],
          );
        } else {
          // EMPRESA EXISTENTE → actualizar `id_cliente`
          await db!.query(
            `UPDATE empresa SET id_cliente = ? WHERE Razon_Social = ? AND CIF = ?`,
            [
              new_cliente.id_cliente,
              body[3].Razon_Social,
              body[3].CIF,
            ],
          );
        }
      }

      //direccion----------------------------------------------------------------------------
      const [dir] = await db!.query(
        `INSERT INTO direccion 
        (id_cliente, direccion, localidad,codigo_postal, municipio, provincia, OBSERVACIONES, Activo)
        VALUES (? ,   ?,          ?,          ?,        ?,        ?,              ?,?)`,
        [
          new_cliente.id_cliente,
          body[1].direccion,
          body[1].localidad,
          body[1].codigo_postal,
          body[1].municipio,
          body[1].provincia,
          body[1].OBSERVACIONES == undefined ? "-" : body[1].OBSERVACIONES,
          1,
        ],
      );
      console.log(dir);

      //contacto----------------------------------------------------------------------------
      const [cont] = await db!.query(
        `INSERT INTO contacto 
        (id_cliente, Telefono, Fijo, Email, OBSERVACIONES, Activo)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          new_cliente.id_cliente,
          body[2].Telefono,
          body[2].Fijo,
          body[2].Email,
          body[2].OBSERVACIONES || "-",
          1,
        ],
      );
      const headers = new Headers({
        Location: `/Clientes/${new_cliente.id_cliente}`,
      });
      return Response.redirect(
        `http://localhost:8000/Clientes/${new_cliente.id_cliente}`,
        303,
      );
    } catch (e) {
      console.log("Error: ", e);
      return new Response("ERRRRRERERER", {
        status: 404,
      });
    }
  },
};
