import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Base } from "../../components/Cliente/Base.tsx";
import { Contacto } from "../../components/Cliente/Contacto.tsx";
import { db } from "../../database_conection/SQLConnection.ts";
import { BBDD_Cliente, BBDD_Contacto, MyState } from "../../types.ts";

export const handler: Handlers<
  { cliente: BBDD_Cliente; contacto?: BBDD_Contacto },
  MyState
> = {
  //@ts-expect-error ctx.params is always defined
  async GET(
    req: Request,
    ctx: FreshContext<
      MyState,
      { cliente: BBDD_Cliente; contacto?: BBDD_Contacto }
    >,
  ) {
    const id = ctx.params.id;
    if (id) {
      const [cli] = await db!.query(
        `SELECT * FROM fabrica.clientes WHERE id_cliente=${id} AND Activo=1`,
      );
      const [cont] = await db!.query(
        `SELECT * FROM fabrica.contacto WHERE id_cliente=${id} `,
      );
      //@ts-expect-error check always exists
      if (cli.length > 0) {
        //@ts-expect-error check always exists
        const cliente: BBDD_Cliente = cli[0];
        //@ts-expect-error check always exists
        if (cont.length > 0) {
          //@ts-expect-error check always exists
          const contacto: BBDD_Contacto = cont[0];
          return ctx.render({ cliente: cliente, contacto: contacto });
        }
        return ctx.render({ cliente: cliente });
      }
      return new Response("Not Found", { status: 404 });
    }
  },
};

export default function Home(
  props: PageProps<
    { cliente: BBDD_Cliente; contacto?: BBDD_Contacto },
    MyState
  >,
) {
  console.log("Props: ", props.data);

  return (
    <div class="flex flex-row w-full h-full">
      <Base cliente={props.data.cliente}></Base>
      <Contacto contacto={props.data.contacto}></Contacto>
    </div>
  );
}
