const express = require("express");

const app = express();

// Middlewares
app.use(express.static("static"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/axios/dist"));
const nunjucks = require("nunjucks");






app.listen(3000, () => {
    console.log("Ejecutando en puerto 3000");
});

// 1. Instalar y configurar Nunjucks
// 2. Crear los templates
// 3. Crear las 4 rutas (2 para autores y 2 para libros)