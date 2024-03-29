import pool from "../config/conn.js";
import { usarFiltros } from '../utils/filtros.js'

export const loginGETModel = async () => {
   try {
      const [rows] = await pool.query("SELECT * FROM cuentas");
      return rows
   } catch (error) {
      return res.status(500).json({ message: "Algo salió mal en la DB " + err });
   }
}

// Todos los gastos (GET) ✅
export const gastosVerModel = async (filtros, usuario) => {

   try {

      const resultado = usarFiltros(filtros, usuario)
      const [rows] = await pool.query(resultado.query, resultado.values)
      const [countResult] = await pool.query(resultado.count, resultado.values)

      const cantidadTotalProductos = countResult[0].total

      return { datos: rows, cantidadTotalProductos }

   } catch (error) {
      throw Error(error)
   }
}

// Importe total gastosTotal (no hay vista) ✅
export const gastosTotalModel = async (filtros, usuario) => {
   try {
      const resultado = usarFiltros(filtros, usuario)

      let sql = "SELECT SUM(importe) FROM gastos WHERE usuario = ? AND moneda = 'pesos'"
      sql += resultado.whereClause

      const [rows] = await pool.query(sql, resultado.values)
      return rows

   } catch (error) {
      throw Error(error)
   }
}

// Vista del Gasto ✅
export const gastosEditarGET_IDModel = async (id) => {

   try {
      const [rows] = await pool.query('SELECT * FROM gastos WHERE id = ?', [id]);
      return rows[0];

   } catch (error) {
      throw Error(error)
   }
}

// Actualización del gasto ✅
export const gastosEditarPUT_IDModel = async (data, id) => {

   try {

      // Convert fechaGasto to MySQL-compatible format if it exists in data
      if (data.fechaGasto) {
         data.fechaGasto = new Date(data.fechaGasto).toISOString().slice(0, 19).replace('T', ' ');
      }
      const [rows] = await pool.query('UPDATE gastos SET ? WHERE id = ?', [data, id]);
      return rows[0];

   } catch (error) {
      throw Error(error)
   }
}

// Todos los gastos COMPARTIDOS (GET) ✅
export const gastosCompartidosVerModel = async (filtros) => {

   try {
      const resultado = usarFiltros(filtros)
      const [rows] = await pool.query(resultado.query, resultado.values)
      const [countResult] = await pool.query(resultado.count, resultado.values)

      const cantidadTotalProductos = countResult[0].total
      return { datos: rows, cantidadTotalProductos }

   } catch (error) {
      throw Error(error)
   }
}

// Importe total COMPARTIDOS (accion)
export const gastosCompartidosTotalModel = async (filtros, usuarios) => {
   try {
      
      const resultado = usarFiltros(filtros)

      let query = "SELECT SUM(importe) FROM gastos WHERE aporte = 1 AND moneda = 'pesos'"
      query += resultado.whereClause


      const calcularImporteUsuario = async (usuario) => {
         let queryUser = `SELECT SUM(importe) FROM gastos WHERE usuario = '${usuario}' AND aporte = 1 AND moneda = 'pesos'`
         queryUser += resultado.whereClause
         const resQueryUser = await pool.query(queryUser, resultado.values)
         return resQueryUser
      }





      let importesUsuarios = []
      if (usuarios) {
         for (const u in usuarios) {
            const importe = await calcularImporteUsuario(usuarios[u].usuario).then(ok => ok)
            importesUsuarios.push({
               usuario: usuarios[u].usuario,
               importe: importe[0][0]['SUM(importe)']
            })
         }
      }

      const [rows] = await pool.query(query, resultado.values)
      return { rows, importesUsuarios }

   } catch (error) {
      throw Error(error)
   }
}

export const addGastoModel = async (data) => {
   try {
      const [rows] = await pool.query("INSERT INTO gastos SET ?", [data])
      return rows
   } catch (error) {
      throw Error(error)
   }
}



// Agregar varios gastos (POST) gastosAgregarVariosPOSTModel()
export const gastosAgregarVariosPOSTModel = async (data) => {

   try {


      for (let i = 0; i < data.length; i++) {

         let gastoPreparado = data[i].split(",")
         gastoPreparado = [null, ...gastoPreparado]
         await pool.query("INSERT INTO gastos (`id`, `item`, `rubro`, `moneda`, `importe`, `aporte`, `gastoFijo`, `tipoPago`, `fechaGasto`, `year`, `imgTicket`, `comentarios`, `usuario`) VALUES (?)", [gastoPreparado])

      }


   } catch (error) {
      throw Error(error)
   }
}

// Borrar gasto
export const borrarGastoModel = async (id) => {

   try {

      await pool.query("DELETE FROM gastos WHERE id = ?", [id])
   } catch (error) {
      throw Error(error)
   }

}