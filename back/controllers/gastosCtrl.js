import { 
   loginGETModel, 
   gastosTotalModel, 
   gastosVerModel, 
   gastosEditarGET_IDModel,
   gastosEditarPUT_IDModel,
   gastosCompartidosVerModel,
   gastosCompartidosTotalModel,
  gastosAgregarVariosPOSTModel,
   borrarGastoModel,
   addGastoModel,
} from "../model/gastosModel.js";


export const loginGET = async (req, res) => {
   try {
      const respuesta = await loginGETModel()
      res.send(respuesta)
   } catch (err) {
      return res.status(500).json({ message: "Algo salió mal " + err });
   }

}

export const verGastosGET = async (req, res) => {



   try {

      let filtros = req.query

      // Parámetros de paginación
      filtros.paginaActual = parseInt(req.query.paginaActual) || 1,
      filtros.tamanoPagina = parseInt(req.query.tamanoPagina) || 10

      let usuario = req.params.usuario

      const totalGastado = await gastosTotalModel(filtros, usuario)
     
      const { datos, cantidadTotalProductos } = await gastosVerModel(filtros, usuario);


      // Calcula la cantidad total de páginas
      const totalPages = Math.ceil(cantidadTotalProductos / filtros.tamanoPagina)

      res.send({
         datos: datos,
         mensaje: req.query.mensaje || "",
         totalGastado: totalGastado[0]['SUM(importe)'],
         paginaActual: filtros.paginaActual, // 1
         tamanoPagina: filtros.tamanoPagina, // 10
         totalPages,
         cantidadTotalProductos
      })

   } catch (error) {
      res.status(500).send(`
         <strong>Internal Server Error: ${error}</strong>
         <p>Por favor volver a intentar</p>
      `);
      
   }

} 

// Ver gasto detallado (sirve para editar) - VISTA
export const gastosEditarGET_ID = async (req, res) => {

   try {
      let id = req.params.id

      const gasto = await gastosEditarGET_IDModel(id);
      res.send(gasto)

   } catch (error) {
      // return res.status(500).json({ message: "Algo salió mal: " + error })
      throw new Error(error)
   }
}

export const addGastoPOST = async (req, res) => {

   let data = req.body
   console.log(data)
   let result = await addGastoModel(data)
   // console.info("datos agregados!" + data)
   return result

}

// Editar un gasto (POST)
export const gastosEditarPUT_ID = async (req, res) => {

   try {
      const id = req.params.id
      const data = req.body

      await gastosEditarPUT_IDModel(data, id)
      console.info("gasto actualizado!" + id)
      res.redirect("http://localhost:5173");
   } catch (error) {
      console.error('Error updating MySQL:', error);
      throw error;
   }
}

// Borrar un gasto 
export const borrarGasto = async (req, res) => {
   let id = req.params.id
   await borrarGastoModel(id)
   res.send("Datos eliminados ID: " + id)
   
}

// Ver gastos compartidos - VISTA
export const gastosCompartidosGET = async (req, res) => {

   try {
      let filtros = req.query
      filtros.paginaActual = parseInt(req.query.paginaActual) || 1,
      filtros.tamanoPagina = parseInt(req.query.tamanoPagina) || 10

      // Cuentas
      let usuarios = await loginGET()

       const totalGastado = await gastosCompartidosTotalModel(filtros, usuarios)
      console.log("totalGastado", totalGastado)

       const { datos, cantidadTotalProductos } = await gastosCompartidosVerModel(filtros);

      // Calcula la cantidad total de páginas
      const totalPages = Math.ceil(cantidadTotalProductos / filtros.tamanoPagina)

      
       res.send({
         datos,
         filtros,
         mensaje: req.query.mensaje || "",
         totalGastado: totalGastado.rows[0]['SUM(importe)'],
          importesUsuarios: totalGastado.importesUsuarios,
         paginaActual: filtros.paginaActual, // 1
         tamanoPagina: filtros.tamanoPagina, // 10
         totalPages,
         cantidadTotalProductos
       })

   } catch (error) {
      throw new Error(error)
   }
}

// Agregar CSV
export const agregarCSVPOST = async (req, res) => {
   try {

      let data = req.body
      await gastosAgregarVariosPOSTModel(data)
      res.send("Gastos registrados")
   } catch (error) {
      console.error('Error al procesar el archivo CSV:', error);
      res.status(500).send('Error interno del servidor');
   }
}