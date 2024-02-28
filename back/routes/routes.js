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
   borrarGasto,
   addGastoPOST
 } 
from '../controllers/gastosCtrl.js';


// Configuración de Multer para el almacenamiento de archivos
const storage = multer.memoryStorage()

const upload = multer({ storage: storage });

// Login
router.get("/", loginGET)

// Ver gastos de USUARIO
router.get("/gastos/ver/:usuario", verGastosGET)

// VER un gasto
router.get("/gastos/editar/:id", gastosEditarGET_ID)

// Agregar gasto 
router.post("/gastos/agregar", addGastoPOST)

// MODIFICAR un Gasto
router.put("/gastos/editar/:id", gastosEditarPUT_ID)

// Borrar gasto (DELETE) gastosBorrarID(id)
router.delete("/gastos/borrar/:id", borrarGasto)

// Ver gastos compartidos
router.get("/gastos/compartidos", gastosCompartidosGET)



// subir varios gastos mediante CSV
router.post("/gastos/subircsv/:usuario", agregarCSVPOST)

export default router