import axios from "axios";

let port = 3000
let url = `http://localhost:${port}`

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