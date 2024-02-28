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


// Ver los gastos
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

// Gastos Compartidos
export const verGastosCompartidos = async (filtros) => {


   try {
      // Le debo pasar la ruta con los queries para que desde el backend pueda tomarlos con el objeto req.
      const res = await axios.get(`${url}/api/gastos/compartidos/${filtros}`)
      return res.data
   } catch (err) {
      return {
         mensaje: "allGastos ERROR!",
         error: err,
      };
   }
}

// Ver UN gasto
export const editarGastoGET = async (id) => {
   try {
      const res = await axios.get(`${url}/api/gastos/editar/${id}`)
      return res.data
   } catch (err) {
      return {
         mensaje: "editarGasto ERROR!",
         error: err,
      };
   }
}

export const addGastoPOST = async (gasto) => {
   try {
      const res = await axios.post(`${url}/api/gastos/agregar`, gasto)
      return res.data
   } catch (err) {
      return {
         mensaje: "addGasto ERROR!",
         error: err,
      };
   }
}

// Editar un gasto
export const editarGastoPUT = async (id, gasto) => {
   try {
      const res = await axios.put(`${url}/api/gastos/editar/${id}`, gasto)
      return res.data
   } catch (err) {
      return {
         mensaje: "editGasto ERROR!",
         error: err,
      };
   }
}

// Borrar gasto
export const deleteGasto = async (id) => {
   try {
      await axios.delete(`${url}/api/gastos/borrar/${id}`)
   } catch (err) {
      return {
         mensaje: "deleteGasto ERROR!",
         error: err,
      };
   }
}

// Agregar varios gastos mediante un CSV
export const agregarCSV = async (usuario, datos) => {
   try {
      const resultado = await axios.post(`${url}/api/gastos/subircsv/${usuario}`, datos)
      return resultado.data
   } catch (error) {
      return {
         mensaje: "Agregar CSV ERROR!",
         error: error.message,
      };
   }
}
