const express = require("express");
const nunjucks = require("nunjucks");

const path = require("path");
// const router = express.Router();
const app = express()
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/axios/dist"));
// se configura nunjucks
nunjucks.configure(path.resolve(__dirname, "templates"), {
    express: app,
    autoscape: true,
    noCache: false,
    watch: true,
});

const {
    add_books,
    mostrar,
    add_autores,
    mostrar_autores,
    add_libros_autores,
} = require("./db.js");

// Nuestras rutas
app.get("/", async(req, res) => {
    const libros = await mostrar();
    console.log(libros);
    res.render('index.html', { libros });
});

app.get("/autores", async(req, res) => {
    const autores = await mostrar_autores();
    console.log(autores);
    res.render('autores.html', { autores });
});

app.post("/libros", async(req, res) => {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", async() => {
        body = JSON.parse(body);
        await add_books(body.title, body.descripcion);
    });
    res.json({ todo: "ok" });
});

app.post("/autores", async(req, res) => {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", async() => {
        body = JSON.parse(body);
        await add_autores(body.firstname, body.lastname, body.notes);
    });
    res.json({ todo: "ok" });
});

app.post("/escribir/:libro_id/:autor_id", async(req, res) => {
    await add_libros_autores(req.params.libro_id, req.params.autor_id);

    res.json({ todo: "ok" });
});

app.listen(3000, () => {
    console.log("Ejecutando en puerto 3000");
});