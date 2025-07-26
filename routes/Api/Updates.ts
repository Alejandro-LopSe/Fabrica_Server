import { FreshContext, Handlers } from "$fresh/server.ts";
import {
  BBDD_Cliente,
  BBDD_Contacto,
  BBDD_Direccion,
  BBDD_Empresa,
} from "../../types.ts";
import { db } from "../../database_conection/SQLConnection.ts";

export const handler: Handlers = {
  PUT: async (req: Request, _ctx: FreshContext) => {
    const body: {
      cl?: Partial<BBDD_Cliente>;
      dr?: Partial<BBDD_Direccion>;
      ct?: Partial<BBDD_Contacto>;
      em?: Partial<BBDD_Empresa>;
    } = await req.json();
    console.log(body);

    const [cl] = await db!.query(
      `UPDATE clientes set
      Nombre='${body.cl!.Nombre}',
      Apellidos='${body.cl!.Apellidos}',
      DNI='${body.cl!.DNI}',
      OBSERVACIONES='${body.cl!.OBSERVACIONES}'
      WHERE (id_cliente like '${body.cl!.id_cliente}' 
            ) AND Activo=1 `,
    );
    const res = new Response("", { status: 200 });

    return res;
  },
};
