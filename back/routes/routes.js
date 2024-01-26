import { Router } from 'express';
import pool from "../config/conn.js";
const router = Router();


// Login
router.get("/", async (req, res) => {
   try {

      const [rows] = await pool.query("SELECT * FROM cuentas");
      res.send(rows)

   } catch (err) {
      return res.status(500).json({ message: "Algo salió mal " + err });
   }

})

export default router