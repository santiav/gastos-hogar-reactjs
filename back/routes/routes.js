import { Router } from 'express';
const router = Router();

import { 
   loginGET, 
   verGastosGET, 
   gastosEditarGET_ID, 
   gastosEditarPUT_ID } 
from '../controllers/gastosCtrl.js';



// Login
router.get("/", loginGET)

router.get("/gastos/ver/:usuario", verGastosGET)

router.get("/gastos/editar/:id", gastosEditarGET_ID)

router.put("/gastos/editar/:id", gastosEditarPUT_ID)

export default router