import axios from "axios";

let port = 3000
let url = `http://localhost:${port}`

// Obtener los usuarios - GET
export const getCuentas = async () => {
   try {
      const data = await axios.get(`${url}/api`)
      return data.data

   } catch (err) {
      return {
         mensaje: "cuentas ERROR!",
         error: err,
      };
   }
}

export const verGastos = async (filtros, usuario) => {
   try {
      // Le debo pasar la ruta con los queries para que desde el backend pueda tomarlos con el objeto req.
      const res = await axios.get(`${url}/api/gastos/ver/${usuario}${filtros}`)
      return res.data
   } catch (err) {
      return {
         mensaje: "allGastos ERROR!",
         error: err,
      };
   }
}

