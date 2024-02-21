import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { agregarCSV } from "../../api/calls.js";
import Loading from "../components/Loading.jsx"

import { AuthContext } from "../context/AuthContext.js";

export default function AgregarVariosGastos() {

   let { usuario } = useContext(AuthContext);

   let [datos, setDatos] = useState({})
   let [mensaje, setMensaje] = useState(false)
   let [cargando, setCargando] = useState(false)

   const leerCSV = (e) => {

      const file = e.target.files[0]
      const fileReader = new FileReader()

      fileReader.readAsText(file)

      fileReader.onload = () => {

         // let encabezados = fileReader.result.split("\r\n").shift()
         let data = fileReader.result.split("\r\n").slice(1)
         setDatos(data)
      }
   }

   const agregar = async (e) => {
      e.preventDefault()
      setCargando(true)
      let data = await agregarCSV(usuario, datos);
      if (data) setMensaje(true)

   };


   return (
      <div className="container mx-auto px-4">

         <h2 className="text-3xl text-sky-500">Incluir varios gastos</h2>
         <p>Para agregar varios gastos se debe agregar un archivo Excel con formato .CSV </p>


         {!mensaje 
            ?
            cargando
               ?
               <div className="flex items-center"><Loading /></div>
               :
               <form className="my-3" onSubmit={agregar}>
                  <input type="file" name="csv" id="csv" onChange={leerCSV} />
                  <input type="submit" value="Subir" className="btn-primary mx-auto w-full block my-5" />
               </form>
            : <p className="bg-green-100 p-5 text-center my-3 rounded-md text-3xl">¡Datos insertados!</p>}



         <Link to="/" className="btn-primary-inverse mx-auto block py-1 my-3 text-sm"> Volver</Link>
      </div>
   )
}
