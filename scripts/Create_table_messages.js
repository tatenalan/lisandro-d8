const { optionsSQLite } = require('../options/SQLite')
// Le paso como parametro los datos de la DB
const knex = require('knex')(optionsSQLite)

// Creamos tabla
knex.schema.createTable('messages', table => {
    table.increments('id')
    table.string('email')
    table.date('date')
    table.string('data')
})

    // Hacemos promesas y cerramos la consulta
    .then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });