const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "biblioteca_dos",
    password: "1234",
    port: "5432",
    max: 12,
    min: 2,
    idleTimeoutMillis: 3000,
    connectTimeoutMillis: 2000,
});

async function add_books(title, descripcion) {
    const client = await pool.connect();
    const { rows } = await client.query({
        text: `insert into libros (title, descripcion) values ($1, $2)`,
        values: [title, descripcion],
    });
    client.release();
    return rows[0];
}
async function mostrar() {
    const client = await pool.connect();
    const { rows } = await client.query(`select * from libros`);
    client.release();
    return rows;
}

async function add_autores(firstname, lastname, notes) {
    const client = await pool.connect();
    const { rows } = await client.query({
        text: `insert into autores (firstname,lastname,notes) values ($1, $2,$3)`,
        values: [firstname, lastname, notes],
        rowMode: "array",
    });
    client.release();
    return rows[0];
}

async function mostrar_autores() {
    const client = await pool.connect();
    const { rows } = await client.query(`select * from autores`);
    client.release();
    return rows;
}

async function add_libros_autores(libro_id, autor_id) {
    const client = await pool.connect();
    const { rows } = await client.query({
        text: `insert into libros_autores (libro_id,autor_id) values ($1, $2)`,
        values: [parseInt(libro_id), parseInt(autor_id)],
    });
    client.release();
    return rows[0];
}

module.exports = {
    add_books,
    mostrar,
    add_autores,
    mostrar_autores,
    add_libros_autores,
};