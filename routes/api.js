const express = require("express");
const router = express.Router();
const {
    add_books,
    mostrar,
    add_autores,
    mostrar_autores,
    add_libros_autores,
} = require("../db.js");

// Nuestras rutas
router.get("/libros", async(req, res) => {
    const user = await mostrar()
    console.log(user)
    res.json(user);

});

router.get("/autores", async(req, res) => {
    const user = await mostrar_autores();
    console.log(user);
    res.json(user);
});


router.post("/libros", async(req, res) => {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", async() => {
        body = JSON.parse(body);
        await add_books(body.title, body.descripcion);
    });
    res.json({ todo: "ok" });
});


router.post("/autores", async(req, res) => {
    let body = "";
    req.on("data", (data) => (body += data));
    req.on("end", async() => {
        body = JSON.parse(body);
        await add_autores(body.firstname, body.lastname, body.notes);
    });
    res.json({ todo: "ok" });
});

router.post("/escribir/:libro_id/:autor_id", async(req, res) => {
    await add_libros_autores(req.params.libro_id, req.params.autor_id)

    res.json({ todo: "ok" });
});




module.exports = router;