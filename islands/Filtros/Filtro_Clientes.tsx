//import { signal } from "@preact/signals-core";
import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { clientes_filtrados, filtro_clientes } from "../../signals.ts";
import { Clientes } from "../Clientes/Clientes.tsx";
import { BBDD_Cliente } from "../../types.ts";
import { Cliente } from "../Clientes/Cliente.tsx";

export const Filtro_Clientes: FunctionalComponent<
  { clts: BBDD_Cliente[]; pag_activa: number }
> = (
  { clts, pag_activa },
) => {
  const [data, setdata] = useState<BBDD_Cliente[]>(clts);
  const [Nombre, setN] = useState<string>("");
  const [Apellidos, setA] = useState<string>("");
  const [DNI, setD] = useState<string>("");
  const [Fecha, setF] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/Api/Cliente?pagina=${pag_activa}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: Nombre,
          Apellidos: Apellidos,
          DNI: DNI,
          Fecha: Fecha,
        }),
      });
      console.log(filtro_clientes.value);

      const d = await res.json();
      if (res.ok) {
        setdata(d);
        console.log("Datos actualizados:", d);
      } else {
        console.error("Error al cargar datos:", res.statusText);
      }
    };
    fetchData();
    console.log("effect: ", filtro_clientes.value);
  }, [Nombre, Apellidos, DNI, Fecha]);
  return (
    <div class="flex flex-col h-full w-full items-start p-2 ">
      <div class="flex flex-row justify-evenly  p-2  border-gray-700 w-full">
        <div class="flex flex-col  justify-start pl-10 text-black  border-gray-700 w-1/4">
          Nombre
          <input
            class="flex justify-center h-full w-fit text-black bg-slate-300 border-gray-700 rounded-md"
            value={Nombre}
            onInput={(e) => {
              setN(e.currentTarget.value);
            }}
          />
        </div>
        <div class="flex flex-col justify-start h-full  pl-10 text-black  border-gray-700 w-1/4">
          Apellidos
          <input
            class="flex justify-start h-full w-fit text-black bg-slate-300 border-gray-700 rounded-md"
            value={Apellidos}
            onInput={(e) => {
              setA(e.currentTarget.value);
            }}
          />
        </div>
        <div class="flex flex-col justify-start h-full pl-10 text-black  border-gray-700 w-1/4">
          DNI
          <input
            class="flex justify-start h-full w-fit text-black bg-slate-300 border-gray-700 rounded-md"
            value={DNI}
            onInput={(e) => {
              setD(e.currentTarget.value);
            }}
          />
        </div>
        <div class="flex flex-col justify-center h-full pr-10 text-black  border-gray-700 w-1/4">
          Fecha
          <input
            class="flex justify-center h-full w-fit  text-black bg-slate-300 border-gray-700 rounded-md"
            value={Fecha}
            onInput={(e) => {
              setF(e.currentTarget.value);
            }}
          />
        </div>
      </div>

      {data.map((c: BBDD_Cliente) => {
        return (
          <Cliente c={c}>
          </Cliente>
        );
      })}
      <div>
        Pagina:<a
          href={pag_activa == 0 ? `` : `/Clientes?pagina=${pag_activa - 1}`}
        >
          {"<< "}
        </a>{" "}
        {pag_activa}
        <a href={`/Clientes?pagina=${pag_activa + 1}`}>{" >>"}</a>
      </div>
    </div>
  );
};
