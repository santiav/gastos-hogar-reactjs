import { Navigate } from "react-router-dom";
import Filtros from "../components/Filtros";


export default function VerGastos(props) {

   const { usuario } = props
   const mensaje = ''
   const totalGastado = 1

   return (

      <div className="bg-white pb-14">
         {
               !usuario 
            ? 
               /* Si ya hay usuario, ir a ver gastos */ 
               <Navigate to={`/`} />
            :
               <main className="bg-white pb-14">
                  {mensaje && <p class="leading-4 bg-green-300 p-5  text-black text-xl font-bold text-center animate-fadeOut"> {mensaje} </p> }

                  <Filtros />

                  <strong className="text-5xl text-center  block">
                     {totalGastado != null ? new Intl.NumberFormat('es-AR', { roundingMode: 'trunc', style: 'currency', currency: 'ARS', roundingPriority: "morePrecision" }).format(totalGastado) : "$ 0" }
                  </strong>

               </main>
         }
         
      </div>
   )
}
