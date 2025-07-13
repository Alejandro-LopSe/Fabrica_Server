import { FreshContext, Handlers } from "$fresh/server.ts";
import { RowDataPacket } from "npm:mysql2@^2.3.3";
import { BBDD_Cliente } from "../../types.ts";
import { db } from "../../database_conection/SQLConnection.ts";

export const handler: Handlers = {
  PUT: async (req: Request, _ctx: FreshContext) => {
    const body: Partial<BBDD_Cliente> = await req.json();

    const [exist] = await db!.query(
      `SELECT * FROM clientes WHERE (Nombre like '%${body.Nombre || ""}%' 
            AND Apellidos like '%${body.Apellidos || ""}%'
            AND DNI like '%${body.DNI || ""}%' ) AND Activo=1;`,
    );
    return new Response(JSON.stringify(exist));
  },
};
