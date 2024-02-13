import { Router } from 'express';
const router = Router();

import { loginGET, verGastosGET } from '../controllers/gastosCtrl.js';



// Login
router.get("/", loginGET)

router.get("/gastos/ver/:usuario", verGastosGET)

export default router