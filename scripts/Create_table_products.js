const { optionsMariaDB } = require('../options/MariaDB.js')
// Le paso como parametro los datos de la DB
const knex = require('knex')(optionsMariaDB)

// Creamos tabla
knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('title')
    table.integer('price')
    table.string('thumbnail', 400)
})

    // Hacemos promesas y cerramos la consulta
    .then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });