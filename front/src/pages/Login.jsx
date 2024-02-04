import { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
// API
import { getCuentas } from "../../api/calls.js"
// Extra
import Loading from "../components/Loading.jsx"
import { AuthContext } from "../context/AuthContext.js";



export default function Login() {

   const { usuario, setUsuario } = useContext(AuthContext);

   // Store users taken from DB
   const [cuentas, setCuentas] = useState(null)
   // Usuario seteado
   // const [usuario, setUsuario] = useState('')

   // react hook form
   const { register, handleSubmit } = useForm();

   // Functions
   const onEnvio = data => {
      setUsuario(data.usuario);
      localStorage.setItem("usuario", data.usuario);
     // setUser(data.usuario); // Actualiza el contexto
   }



   // ---
   useEffect(() => {
      
      if (!usuario) {
         setUsuario(localStorage.getItem("usuario"));
      } 
      // Check accounts at DB
      const fetchData = async () => {
         const data = await getCuentas();
         setCuentas(data)
      }
      fetchData()
   }, [])


   return (

      <div className="flex items-center h-screen">
         {/* Si ya hay usuario, ir a ver gastos */}
         {usuario && <Navigate to={`/gastos/ver/${usuario}`} />}
         
         {/* Si se logró obtener las cuentas, mostrar la selección */}
         {
            cuentas
            ?
            <form onSubmit={handleSubmit(onEnvio)} className="container p-4">

               <label htmlFor="usuario" className="form-label mb-10 text-5xl text-center block">Usuario</label>
               <select name="usuario" id="usuario" className="form-campo mb-10 text-4xl"          
                  {...register("usuario", {
                     required: true
                  })}
               >

                  <option value="" defaultValue="Seleccionar" disabled>---- Seleccionar ----</option>
                  {cuentas.map(user => (
                     <option key={user.id} value={user.usuario}>{user.usuario}</option>
                  ))}
               </select>

               <input type="submit" value="Entrar" className="btn-primary-inverse w-full" />
            </form>
            :
            <Loading />
                     
         }
      </div>


   )
}
