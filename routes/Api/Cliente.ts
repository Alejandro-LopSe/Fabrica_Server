import { FreshContext, Handlers } from "$fresh/server.ts";
import { BBDD_Cliente } from "../../types.ts";
import { db } from "../../database_conection/SQLConnection.ts";

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
};
