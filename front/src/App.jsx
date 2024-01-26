import { useEffect } from "react"
import { getUsuarios } from "../api/calls.js"

function App() {


   useEffect(() => {
      // Check users at DB
      const fetchData = async () => {
         const data = await getUsuarios();
         console.log(data)
      }
      fetchData()
   },[])


   return (
      <div className="flex items-center h-screen">

         <form action="/" method="post" className="container p-4">

            <label htmlFor="usuario" className="form-label mb-10 text-5xl text-center block">Usuario</label>
            <select name="usuario" id="usuario" className="form-campo mb-10 text-4xl">
               <option value="" defaultValue="Seleccionar" disabled>---- Seleccionar ----</option>
               <option value="santi">santi</option>
               <option value="syl">syl</option>
            </select>

            <input type="submit" value="Entrar" className="btn-primary-inverse w-full" />
         </form>

      </div>
   )
}

export default App
