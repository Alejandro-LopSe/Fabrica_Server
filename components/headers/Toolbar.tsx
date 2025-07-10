import { FunctionalComponent } from "preact";
import { User } from "../../types.ts";
import { Toolbar_Cliente } from "../../islands/Desplegables/Toolbar_Cliente.tsx";
import { Toolbar_Pedidos } from "../../islands/Desplegables/Toolbar_Pedidos.tsx";
import { Toolbar_Articulo } from "../../islands/Desplegables/Toolbar_Articulo.tsx";
import { Toolbar_Otros } from "../../islands/Desplegables/Toolbar_Otros.tsx";

export const Toolbar: FunctionalComponent<{ _state: Partial<User> }> = (
  { _state },
) => {
  return (
    <div class="flex flex-col w-fit h-[calc(100dvh-4rem)]  bg-gray-800 text-white items-start justify-start space-y-5 pt-5 px-4">
      <a href="/Portal" class="flex w-full border-b-2 border-gray-700 ">Home</a>
      <Toolbar_Cliente />
      <Toolbar_Pedidos />
      <Toolbar_Articulo />
      <Toolbar_Otros />
    </div>
  );
};
