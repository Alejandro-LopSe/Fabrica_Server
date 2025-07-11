import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Base } from "../../components/Detalle/Base.tsx";
import { Contacto } from "../../components/Detalle/Contacto.tsx";
import { Direccion } from "../../components/Detalle/Direccion.tsx";
import { Empresa } from "../../components/Detalle/Empresa.tsx";
import { db } from "../../database_conection/SQLConnection.ts";
import {
  BBDD_Cliente,
  BBDD_Contacto,
  BBDD_Direccion,
  BBDD_Empresa,
  MyState,
} from "../../types.ts";

export const handler: Handlers<
  {
    cliente?: BBDD_Cliente;
    contacto?: BBDD_Contacto;
    direccion?: BBDD_Direccion;
    empresa: BBDD_Empresa;
  },
  MyState
> = {
  //@ts-expect-error ctx.params is always defined
  async GET(
    _req: Request,
    ctx: FreshContext<
      MyState,
      {
        cliente?: BBDD_Cliente;
        contacto?: BBDD_Contacto;
        direccion?: BBDD_Direccion;
        empresa: BBDD_Empresa;
      }
    >,
  ) {
    const id = ctx.params.id;
    if (id) {
      const [em] = await db!.query(
        `SELECT * FROM fabrica.empresa WHERE id_empresa=${id} AND Activo=1 `,
      );
      //@ts-expect-error check always exists
      if (em.length > 0) {
        //@ts-expect-error check always exists
        const empresa: BBDD_Empresa = em[0];

        const [cli] = await db!.query(
          `SELECT * FROM fabrica.clientes WHERE id_cliente=${
            //@ts-expect-error check always exists
            em.id_cliente ? em.id_cliente : 0} AND Activo=1 `,
        );

        const [cont] = await db!.query(
          `SELECT * FROM fabrica.contacto WHERE id_empresa=${id} `,
        );
        const [dir] = await db!.query(
          `SELECT * FROM fabrica.direccion WHERE id_empresa=${id} `,
        );

        const data = {
          //@ts-expect-error check always exists
          cliente: cli.length > 0 ? em[0] : undefined,
          //@ts-expect-error check always exists
          contacto: cont.length > 0 ? cont[0] : undefined,
          //@ts-expect-error check always exists
          direccion: dir.length > 0 ? dir[0] : undefined,

          empresa: empresa,
        };
        return ctx.render(data);
      }
      return new Response("Not Found", { status: 404 });
    }
  },
};

export default function Home(
  props: PageProps<
    {
      cliente?: BBDD_Cliente;
      contacto?: BBDD_Contacto;
      direccion?: BBDD_Direccion;
      empresa: BBDD_Empresa;
    },
    MyState
  >,
) {
  console.log("Props: ", props.data);

  return (
    <div class="flex flex-row justify-start min-h-[calc(100dvh-5rem)] min-w-[calc(100dvw-6rem)]">
      <Base cliente={props.data.empresa}></Base>
      <div class="flex flex-col justify-start w-full h-min">
        <Contacto contacto={props.data.contacto}></Contacto>
        <Direccion direccion={props.data.direccion}></Direccion>
        <Empresa empresa={props.data.cliente}></Empresa>
      </div>
    </div>
  );
}
