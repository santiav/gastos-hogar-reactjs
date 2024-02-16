import Loading from "../components/Loading.jsx"
import TablaGastosCompartidos from "../components/TablaGastosCompartidos.jsx";
import Filtros from "../components/Filtros";

export default function GastosCompartidos({
   usuario,
   datos,
   setFiltros,
   cambiarPagina,
   cargando,
   mensaje,
}) {



   return (
      <div className="bg-white pb-14">
         {

            <main className="bg-white pb-14">
               {mensaje && <p className="leading-4 bg-green-300 p-5  text-black text-xl font-bold text-center animate-fadeOut"> {mensaje} </p>}

               <Filtros onFiltrar={(nuevosFiltros) => setFiltros(nuevosFiltros)} />

               <h1 className="text-center font-bold  text-2xl">Gastos compartidos</h1>
               
               <strong className="text-5xl text-center  block">
                  {datos.totalGastado != null ? new Intl.NumberFormat('es-AR', { roundingMode: 'trunc', style: 'currency', currency: 'ARS', roundingPriority: "morePrecision" }).format(datos.totalGastado) : "$ 0"}
               </strong>
               <p className="text-center text-xl mb-3 leading-5 mx-4 text-slate-500">Aportes al hogar<br /> (ej: comida (porque la consumen ambos), etc)</p>
               <div className="grid grid-cols-2 text-2xl text-center m-4 ">
                  {datos.importesUsuarios === undefined ? (
                     <Loading />
                  ) : (
                     datos.importesUsuarios.map((obj, i) => (
                        <div key={i} className="mx-2 bg-slate-200 p-2 rounded"> 
                           {obj.usuario}<br />
                           <strong>
                              {new Intl.NumberFormat('es-AR', {
                                 roundingMode: 'trunc',
                                 style: 'currency',
                                 currency: 'ARS',
                                 roundingPriority: "morePrecision"
                              }).format(obj.importe)}
                           </strong>
                        </div>
                     ))
                  )}
               </div>
              

               {/* Tabla */}
               <div style={{ overflow: "scroll" }} className="bg-white rounded-[10px] mb-[50px] md:p-[20px] mt-5 pt-3 px-2">
                  

                  <div className="table w-full">

                     <div className="table-header-group  text-center text-xs font-semibold uppercase text-white">
                        <div className="grid gap-x-1 md:gap-x-3 grid-cols-[60px_minmax(100px,_55%)_25%_20%] md:grid-cols-[60px_minmax(100px,_50%)_16.66%_16.66%_16.66%] gap-3">
                           <span className="p-3 rounded  text-left bg-orange-500 col-span-2">Item</span>
                           <span className="p-3 rounded bg-orange-500">Importe</span>
                           <span className="p-3 rounded hidden sm:block bg-orange-500 text-white">T.Pago</span>
                           <span className="p-3 rounded bg-orange-500">Usuario</span>
                        </div>
                     </div>
                     {/* table-row-group */}


                     {cargando ? <div className='flex justify-center'><Loading /></div> : <TablaGastosCompartidos usuario={usuario} datos={datos} onCambiarPagina={(paginaParams) => cambiarPagina(paginaParams)} />}

                  </div>

               </div>

            </main>
         }

      </div>
   )
}
