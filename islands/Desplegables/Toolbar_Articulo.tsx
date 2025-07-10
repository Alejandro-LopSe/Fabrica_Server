import { useState } from "preact/hooks";
import { FunctionalComponent } from "preact";

export const Toolbar_Articulo: FunctionalComponent = () => {
  const [isHover, hovering] = useState<boolean>(false);

  return (
    <div
      class="relative inline-block  border-gray-700 w-full"
      onMouseEnter={() => hovering(true)}
      onMouseLeave={() => hovering(false)}
    >
      <div class="bg-gray-800 text-white justify-items-start rounded cursor-pointer">
        Articulo
      </div>

      {isHover && (
        <div class="absolute left-full top-0 ml-0 flex flex-col bg-gray-700 p-2 rounded shadow">
          <div>Ver</div>
          <div>Añadir</div>
        </div>
      )}
    </div>
  );
};
