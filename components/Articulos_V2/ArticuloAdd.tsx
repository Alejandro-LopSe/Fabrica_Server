import { FunctionalComponent } from "preact";

export const Login: FunctionalComponent = () => {
  return (
    <div class="flex flex-col justify-around w-full p-2">
      <div class="flex flex-col justify-around w-full p-2 text-black border-gray-800 border-solid rounded-md border-2">
        <div class="flex flex-row justify-around  text-black  w-full">
          <div class="flex flex-row justify-start  text-black  w-full">
            Envase:{" "}
            <select
              name=""
              id={Object.values(envase).toString()}
              class="flex px-1 mx-1  border-solid border-2 text-black bg-slate-300 border-gray-500 rounded-md"
              onChange={(e) => {
                console.log(newartMAD);
                setneartMAD({
                  ...newartMAD,
                  envase: envase[parseInt(e.currentTarget.value)],
                });
                console.log(newartMAD);
              }}
              value={newartMAD.envase!.id}>
              {envase.map((a) => {
                return (
                  <option value={a.id} key={a.id}>
                    {a.tipo}
                  </option>
                );
              })}
            </select>
          </div>
          <div class="flex flex-row  justify-end text-black w-full">
            Tamaño:{" "}
            <select
              name=""
              id={Object.values(tamano).toString()}
              class="flex px-1 mx-1 border-solid border-2 text-black bg-slate-300 border-gray-500 rounded-md"
              onChange={(e) => {
                setneartMAD({
                  ...newartMAD,
                  tamano: tamano[parseInt(e.currentTarget.value)],
                });
                console.log(newartMAD);
              }}
              value={newartMAD.tamano!.id}>
              {tamano.map((a) => {
                return <option value={a.id}>{a.tipo}</option>;
              })}
            </select>
          </div>
        </div>
        <div class="flex flex-row justify-around  text-black  w-full">
          <div class="flex flex-row  justify-start text-black w-full">
            Aceite: Madroñal
          </div>
          <div class="flex flex-row  justify-end text-black w-full">
            IVA:{" "}
            <select
              name=""
              id={Object.values(iva).toString()}
              class="flex px-1 mx-1 border-solid border-2 text-black bg-slate-300 border-gray-500 rounded-md"
              onChange={(e) => {
                setneartMAD({
                  ...newartMAD,
                  Tipo_IVA: iva[parseInt(e.currentTarget.value)],
                });
                console.log(newartMAD);
              }}
              value={newartMAD.Tipo_IVA!.id}>
              {iva.map((a) => {
                return <option value={a.id}>{a.tipo}</option>;
              })}
            </select>
            %
          </div>
        </div>
        <div class="flex flex-row justify-around  text-black  w-full">
          <div class="flex flex-row   justify-start  text-black   w-full">
            Precio:
            <div class="flex flex-row  px-2 mx-2 justify-start  text-black   w-full">
              <div class="flex flex-row  px-2 mx-2 ">{`€`}</div>
              <div class="flex flex-row  px-2 mx-2 ">{`-`}</div>
              <input
                type="number"
                name="precio"
                id="precio"
                class="flex flex-row  px-2 mx-2  text-black bg-slate-300 border-gray-700 rounded-md"
                onFocusOut={(e) => {
                  setneartMAD({
                    ...newartMAD,
                    precio: parseFloat(e.currentTarget.value),
                  });
                  console.log(newartMAD);
                }}
                value={newartMAD.precio}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-start py-1 pl-2  space-x-2  w-fit pr-1">
        <SaveArticulo art={newartMAD}></SaveArticulo>
        <button
          class="flex flex-row justify-start py-1  pl-2 space-x-2 border-2 rounded-md border-gray-700 w-fit pr-1"
          onClick={() => {
            setaddMAD(false);
          }}
          type="button">
          <img src="x-circle.png" class="w-6 h-6" />
          Cancelar
        </button>
      </div>
    </div>
  );
};
