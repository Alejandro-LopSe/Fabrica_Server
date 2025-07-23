import { FreshContext, Handlers } from "$fresh/server.ts";
import { db } from "../../../database_conection/SQLConnection.ts";

export const handler: Handlers = {
  GET: async (_req: Request, _ctx: FreshContext) => {
    const url = new URL(_req.url);
    const cif = url.searchParams.get("cif");
    const [exist] = await db!.query(
      `SELECT * FROM empresa where CIF = '${cif}'`,
    );
    console.log(cif);

    const res = new Response(JSON.stringify(exist));

    return res;
  },
};
