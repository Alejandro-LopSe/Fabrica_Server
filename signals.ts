import { BBDD_Cliente } from "./types.ts";
import { Signal } from "@preact/signals-core";
export const filtro_clientes = new Signal<BBDD_Cliente>();
export const clientes_filtrados = new Signal<BBDD_Cliente[]>([]);
