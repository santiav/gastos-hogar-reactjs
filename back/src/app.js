import express from 'express'
import cors from 'cors'
import routes from '../routes/routes.js'

const app = express()

// Configurar las opciones de CORS
const corsOptions = {
   origin: 'exquisite-banoffee-8c66ce.netlify.app/',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Content-Type', 'Authorization'], 
};

// Middleware
app.use(cors(corsOptions));
// Habilitar CORS para todas las rutas
app.options('*', cors(corsOptions))
// analizar JSON 
app.use(express.json());
// Analizar datos de formulario codificados en URL
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes)

export default app;
