import { FunctionalComponent } from "preact";
import { BBDD_Cliente } from "../../types.ts";

export const Cliente: FunctionalComponent<{ c: BBDD_Cliente }> = (
  { c },
) => {
  return (
    <a
      class="flex flex-row justify-between w-full items-start p-2 space-x-3 text-black border-gray-800 border-solid rounded-md border-2"
      id={`cliente-${c.id_cliente}`}
      href={`/Clientes/${c.id_cliente}`}
    >
      <div class="flex flex-row justify-start h-full p-2  space-x-2 text-black  border-gray-700 w-full">
        {c.Nombre}
      </div>
      <div class="flex flex-row justify-start h-full p-2  space-x-2 text-black  border-gray-700 w-full">
        {c.Apellidos}
      </div>
      <div class="flex flex-row justify-start h-full p-2  space-x-2 text-black  border-gray-700 w-full">
        {c.DNI}
      </div>
      <div class="flex flex-row justify-start h-full p-2  space-x-2 text-black  border-gray-700 w-full">
        {c.Fecha_mod}
      </div>
    </a>
  );
};
