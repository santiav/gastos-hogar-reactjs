import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext.js";
import VerGastos from './VerGastos.jsx';

export default function VerGastosContainer() {

   let { usuario } = useContext(AuthContext);


   return (

      <VerGastos
         usuario={usuario}
      />
   )
}
