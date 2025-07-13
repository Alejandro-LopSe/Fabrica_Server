//import { signal } from "@preact/signals-core";
import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { clientes_filtrados, filtro_clientes } from "../../signals.ts";
import { Clientes } from "../Clientes/Clientes.tsx";
import { BBDD_Cliente } from "../../types.ts";

export const Filtro_Clientes: FunctionalComponent<{ clts: BBDD_Cliente[] }> = (
  { clts },
) => {
  const change = () => {
  };
  return (
    <>
      <div class="flex flex-row justify-between border-gray-700 w-full">
        <div class="flex flex-row justify-center h-full p-2  space-x-2 text-black  border-gray-700 w-full">
          Nombre
          <input
            value={filtro_clientes.value?.Nombre || ""}
            onInputCapture={(e) => {
              filtro_clientes.value = {
                ...filtro_clientes.value,
                Nombre: e.currentTarget.value,
              };
            }}
          />
        </div>
        <div class="flex flex-row justify-center  h-full p-2  space-x-2 text-black  border-gray-700 w-full">
          Apellidos
          <input
            value={filtro_clientes.value?.Apellidos || ""}
            onInput={(e) => {
              filtro_clientes.value = {
                ...filtro_clientes.value,
                Apellidos: e.currentTarget.value,
              };
            }}
          />
        </div>
        <div class="flex flex-row justify-center h-full p-2  space-x-2 text-black  border-gray-700 w-full">
          DNI
          <input
            value={filtro_clientes.value?.DNI || ""}
            onInput={(e) => {
              filtro_clientes.value = {
                ...filtro_clientes.value,
                DNI: e.currentTarget.value,
              };
            }}
          />
        </div>
        <div class="flex flex-row justify-center h-full p-2  space-x-2 text-black  border-gray-700 w-full">
          Fecha
          <input
            value={filtro_clientes.value?.Fecha_mod || ""}
            onInput={(e) => {
              filtro_clientes.value = {
                ...filtro_clientes.value,
                Fecha_mod: e.currentTarget.value,
              };
            }}
          />
        </div>
      </div>
    </>
  );
};
