import { Router } from 'express';
import multer from 'multer'
const router = Router();

import { 
   loginGET, 
   verGastosGET, 
   gastosEditarGET_ID, 
   gastosEditarPUT_ID,
   gastosCompartidosGET,
   agregarCSVPOST,
   borrarGasto
 } 
from '../controllers/gastosCtrl.js';
import { gastosAgregarVariosPOSTModel } from "../model/gastosModel.js"

// Configuración de Multer para el almacenamiento de archivos
const storage = multer.memoryStorage()

const upload = multer({ storage: storage });

// Login
router.get("/", loginGET)

// Ver gastos de USUARIO
router.get("/gastos/ver/:usuario", verGastosGET)

// VER un gasto
router.get("/gastos/editar/:id", gastosEditarGET_ID)

// MODIFICAR un Gasto
router.put("/gastos/editar/:id", gastosEditarPUT_ID)

// Borrar gasto (DELETE) gastosBorrarID(id)
router.delete("/gastos/borrar/:id", borrarGasto)

// Ver gastos compartidos
router.get("/gastos/compartidos", gastosCompartidosGET)



// subir varios gastos mediante CSV
router.post("/gastos/subircsv/:usuario", async (req, res) => {
   try {

      let data = req.body
      await gastosAgregarVariosPOSTModel(data)
      res.send("Gastos registrados")
   } catch (error) {
      console.error('Error al procesar el archivo CSV:', error);
      res.status(500).send('Error interno del servidor');
   }
})

export default router