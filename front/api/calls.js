import axios from "axios";

let port = 3000
let url = "https://gorgeous-boa-gaiters.cyclic.app" || `http://localhost:${port}`

// Funciones que llaman a las rutas establecidas en server.js

export const getUsuarios = async () => {
   try {
      const data = await axios.get(`${url}/api`)
      return data.data

   } catch (err) {
      return {
         mensaje: "usuarios ERROR!",
         error: err,
      };
   }
}