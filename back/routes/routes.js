import { Router } from 'express';
const router = Router();


// Login
router.get("/", (req, res) => {
      res.send("Login...")
})

export default router