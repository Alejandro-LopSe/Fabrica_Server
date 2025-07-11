import { FunctionalComponent } from "preact";
import { BBDD_Cliente } from "../../types.ts";
import { Lable_texto } from "../Generales/Lable_texto.tsx";
import { Lable_notas } from "../Generales/Lable_notas.tsx";

export const Base: FunctionalComponent<{ cliente: BBDD_Cliente }> = (
  { cliente },
) => {
  return (
    <div class="flex flex-col w-fit h-full p-2">
      <label class="font-bold" value={`cliente-${cliente.id_cliente}`}>
        Datos Basicos
      </label>
      <div
        class="flex flex-col justify-start p-2  text-black border-gray-800 border-solid rounded-md border-2"
        id={`cliente-${cliente.id_cliente}`}
      >
        <Lable_texto label="Nombre:" texto={cliente.Nombre} />
        <Lable_texto label="Apellidos:" texto={cliente.Apellidos} />
        <Lable_texto label="DNI:" texto={cliente.DNI} />
        <Lable_notas label="OBSERVACIONES:" texto={cliente.OBSERVACIONES} />
      </div>
    </div>
  );
};
