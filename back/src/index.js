
import app from "./app.js";
import { PORT } from "../config/config.js";

app.listen(PORT);
console.log(`Servidor ONLINE en puerto: ${PORT}`);