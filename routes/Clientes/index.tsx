import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import { db } from "../../database_conection/SQLConnection.ts";

import { Filtro_Clientes } from "../../islands/Filtros/Filtro_Clientes.tsx";
import { BBDD_Cliente, MyState } from "../../types.ts";
import { clientes_filtrados } from "../../signals.ts";
import { Clientes } from "../../islands/Clientes/Clientes.tsx";

export const handler: Handlers<BBDD_Cliente[], MyState> = {
  async GET(
    _req: Request,
    ctx: FreshContext<
      MyState,
      BBDD_Cliente[]
    >,
  ) {
    const [cli] = await db!.query(
      `SELECT * FROM fabrica.clientes WHERE Activo=1`,
    );
    //@ts-expect-error check always exists
    if (cli.length > 0) {
      //@ts-expect-error check always exists
      const cliente: BBDD_Cliente[] = cli;
      return ctx.render(cliente);
    }
    return new Response("Not Found", { status: 404 });
  },
};

export default function Home(
  props: PageProps<BBDD_Cliente[], MyState>,
) {
  return (
    <div class="flex flex-row justify-start min-h-[calc(100dvh-5rem)] min-w-[calc(100dvw-6rem)]">
      <div class="flex flex-col w-full h-full p-2">
        <label class="font-bold">Clientes</label>
        <div class="flex flex-col w-full h-full items-start p-2  text-black border-gray-800 border-solid rounded-md border-2">
          <Filtro_Clientes clts={props.data}></Filtro_Clientes>
          <Clientes clts={props.data}></Clientes>
        </div>
      </div>
    </div>
  );
}
