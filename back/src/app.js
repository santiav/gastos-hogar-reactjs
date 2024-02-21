import express from 'express'
import cors from 'cors'
import routes from '../routes/routes.js'

const app = express()

// Middleware
app.use(cors());
// analizar JSON 
app.use(express.json());
// Analizar datos de formulario codificados en URL
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes)

export default app;
