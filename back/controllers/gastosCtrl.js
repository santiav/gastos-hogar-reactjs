import { loginGETModel, gastosTotalModel, gastosVerModel } from "../model/gastosModel.js";


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

      filtros.paginaActual = parseInt(req.query.paginaActual) || 1,
      filtros.tamanoPagina = parseInt(req.query.tamanoPagina) || 5

      let usuario = req.params.usuario

      const totalGastado = await gastosTotalModel(filtros, usuario)
     
      const { datos, cantidadTotalProductos } = await gastosVerModel(filtros, usuario);

      console.log(datos)
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