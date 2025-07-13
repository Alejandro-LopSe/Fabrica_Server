import { FunctionalComponent } from "preact";
import { BBDD_Cliente } from "../../types.ts";

export const Cliente: FunctionalComponent<{ c: BBDD_Cliente }> = (
  { c },
) => {
  return (
    <div
      class="flex flex-row justify-around w-full items-start p-2 space-x-3 text-black border-gray-800 border-solid rounded-md border-2"
      id={`cliente-${c.id_cliente}`}
    >
      <div>{c.Nombre}</div>
      <div>{c.Apellidos}</div>
      <div>{c.DNI}</div>
      <div>{c.Fecha_mod}</div>
    </div>
  );
};
