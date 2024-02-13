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

// Importe total gastosTotal (no hay vista)
export const gastosTotalModel = async (filtros, usuario) => {
   try {
      const resultado = usarFiltros(filtros, usuario)

      // console.log(resultado)
      let sql = "SELECT SUM(importe) FROM gastos WHERE usuario = ? AND moneda = 'pesos'"
      sql += resultado.whereClause

      const [rows] = await pool.query(sql, resultado.values)
      return rows

   } catch (error) {
      throw Error(error)
   }
}
