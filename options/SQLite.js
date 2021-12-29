var path = require('path');
var fileName = path.join(__dirname, '../DB/ecommerce.sqlite');

const optionsSQLite = {
    client: 'sqlite3',
    connection: {
        filename: fileName
    },
    useNullAsDefault: true
}

module.exports = {
    optionsSQLite
}