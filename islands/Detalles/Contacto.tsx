import { FunctionalComponent } from "preact";
import { BBDD_Contacto } from "../../types.ts";
import { Lable_texto } from "../../components/Generales/Lable_texto.tsx";
import { Lable_notas } from "../../components/Generales/Lable_notas.tsx";

export const Contacto: FunctionalComponent<{ contacto?: BBDD_Contacto }> = (
  { contacto },
) => {
  return (
    <div class="flex flex-col w-full h-full p-2">
      {contacto
        ? (
          <>
            <label class="font-bold" value={`cliente-${contacto.id_contacto}`}>
              Contacto
            </label>
            <div
              class="flex flex-row w-full h-fit items-center justify-around p-1 text-black border-gray-800 border-solid rounded-md border-2 mr-2"
              id={`cliente-${contacto.id_contacto}`}
            >
              <div class="flex flex-row justify-start p-2  space-x-2 text-black ">
                <input
                  type="checkbox"
                  class="flex self-start mt-2 px-5 text-black "
                  checked={contacto.activo}
                />
              </div>

              <Lable_texto label="Telefono 2:" texto={contacto.Fijo} />
              <Lable_texto label="Email:" texto={contacto.Email} />
              <Lable_notas
                label="OBSERVACIONES:"
                texto={contacto.OBSERVACIONES}
              />
            </div>
          </>
        )
        : null}
    </div>
  );
};
