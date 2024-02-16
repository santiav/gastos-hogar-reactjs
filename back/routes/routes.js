import { Router } from 'express';
const router = Router();

import { 
   loginGET, 
   verGastosGET, 
   gastosEditarGET_ID, 
   gastosEditarPUT_ID,
   gastosCompartidosGET } 
from '../controllers/gastosCtrl.js';



// Login
router.get("/", loginGET)

// Ver gastos de USUARIO
router.get("/gastos/ver/:usuario", verGastosGET)

// VER un gasto
router.get("/gastos/editar/:id", gastosEditarGET_ID)

// MODIFICAR un Gasto
router.put("/gastos/editar/:id", gastosEditarPUT_ID)

// Ver gastos compartidos
router.get("/gastos/compartidos", gastosCompartidosGET)

export default router