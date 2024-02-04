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

