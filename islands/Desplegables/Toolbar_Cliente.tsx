import { useState } from "preact/hooks";
import { FunctionalComponent } from "preact";

export const Toolbar_Cliente: FunctionalComponent = () => {
  const [isHover, hovering] = useState<boolean>(false);

  return (
    <div
      class="relative flex justify-start border-gray-700 w-full"
      onMouseEnter={() => hovering(true)}
      onMouseLeave={() => hovering(false)}
    >
      <div class="flex bg-gray-800 justify-items-start text-white rounded cursor-pointer">
        Clientes
      </div>

      {isHover && (
        <div class="absolute left-full top-0 ml-0 flex flex-col bg-gray-700 p-2 rounded shadow">
          <a href="/Clientes">Ver</a>
          <a href="/Clientes/Añadir">Añadir</a>
        </div>
      )}
    </div>
  );
};
