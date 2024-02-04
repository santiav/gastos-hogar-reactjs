import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext.js";
import { Navigate } from "react-router-dom";

export default function VerGastos() {

   let { usuario } = useContext(AuthContext);
   console.log(usuario)


   

   return (

      <div className="bg-white pb-14">
         {
               !usuario 
            ? 
               /* Si ya hay usuario, ir a ver gastos */ 
               <Navigate to={`/`} />
            :
               <h1>Estás en ver gastos {usuario}</h1>
         }
         
      </div>
   )
}
