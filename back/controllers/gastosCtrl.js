import { loginGETModel, gastosTotalModel, gastosVerModel, gastosEditarGET_IDModel,
   gastosEditarPUT_IDModel} from "../model/gastosModel.js";


export const loginGET = async (req, res) => {
   try {
      res.send(await loginGETModel())
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

// Editar un gasto (POST)
export const gastosEditarPUT_ID = async (req, res) => {

   try {
      const id = req.params.id
      const data = req.body
      console.log("id -->", id)
      console.log("data -->", data)

      await gastosEditarPUT_IDModel(data, id)
      console.info("gasto actualizado!" + id)
      res.redirect("http://localhost:5173");
   } catch (error) {
      console.error('Error updating MySQL:', error);
      throw error;
   }
}