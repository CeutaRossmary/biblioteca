const express = require("express");

const app = express();

// Middlewares
app.use(express.static("static"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/axios/dist"));


app.listen(3000, () => {
        console.log('Ejecutando en puerto 3000')
    })
    // Obtengo las rutas de archivos externos
const rutas_api = require("./routes/api.js");
app.use("/api", rutas_api);

// 1. Instalar y configurar Nunjucks
// 2. Crear los templates
// 3. Crear las 4 rutas (2 para autores y 2 para libros)