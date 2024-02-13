import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading.jsx"
import TablaGastos from "../components/TablaGastos.jsx";
import Filtros from "../components/Filtros";
import { useEffect, useState } from "react";
// API
import { verGastos } from "../../api/calls.js"

export default function VerGastos(props) {

   const { usuario } = props

   const [filtros, setFiltros] = useState({});
   const [datos, setDatos] = useState({})
   const [cargando, setCargando] = useState(false); 

   let location = useLocation();

   // ---
   useEffect(() => {

      // Check accounts at DB
      const fetchData = async () => {
         setCargando(true); // Iniciar carga
         const data = await verGastos(location.search, usuario);
         setDatos(data);
         setCargando(false); // Finalizar cargar verGastos
      }
      fetchData()

   }, [filtros, location])

   if (!usuario) {
      return <Navigate to={`/`} />;
   }

   return (

      <div className="bg-white pb-14">
         {
            
               <main className="bg-white pb-14">
                  {datos.mensaje && <p class="leading-4 bg-green-300 p-5  text-black text-xl font-bold text-center animate-fadeOut"> {mensaje} </p> }

                  <Filtros onFiltrar={(nuevosFiltros) => setFiltros(nuevosFiltros)} />

                  <strong className="text-5xl text-center  block">
                     {datos.totalGastado != null ? new Intl.NumberFormat('es-AR', { roundingMode: 'trunc', style: 'currency', currency: 'ARS', roundingPriority: "morePrecision" }).format(datos.totalGastado) : "$ 0" }
                  </strong>

                  {/* Tabla */}
                  <div style={{ overflow: "scroll" }} className="bg-white rounded-[10px] mb-[50px] md:p-[20px] mt-5 pt-3 px-2">
                     <h3 className="mb-2 text-2xl text-sky-500">Gastos diarios</h3>

                     <div className="table w-full">

                        <div className="table-header-group  text-center text-xs font-semibold uppercase text-white">
                           <div className="grid gap-x-1 md:gap-x-3 grid-cols-[60px_minmax(100px,_50%)_25%_25%] md:grid-cols-[60px_minmax(100px,_50%)_16.66%_16.66%_16.66%] gap-3">
                              <span className="p-3 rounded  text-left bg-orange-500 col-span-2">Item</span>
                              <span className="p-3 rounded bg-orange-500">Importe</span>

                              <span className="p-3 rounded hidden sm:block bg-orange-500">T.Pago</span>
                              <span className="p-3 rounded bg-orange-500">Acciones</span>
                           </div>
                        </div>
                        {/* table-row-group */}                   

                       
                     {cargando ? <div className='flex justify-center'><Loading /></div> :  <TablaGastos usuario={usuario} datos={datos} /> }

                     </div>

                  </div>

               </main>
         }
         
      </div>
   )
}
