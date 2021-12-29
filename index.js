const {optionsMariaDB} = require("./options/MariaDB")
const {optionsSQLite} = require("./options/SQLite")
const knexMariaDB = require("knex")(optionsMariaDB)
const knexSQLite = require("knex")(optionsSQLite)
const express = require('express');
const handlebars = require('express-handlebars');

const Contenedor = require('./src/Products');
const product = new Contenedor(knexMariaDB, "products")

const Message = require('./src/Messages');
const message = new Message(knexSQLite, "messages")

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require('socket.io')

const app = express();
const PORT = process.env.PORT || 8080
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
var usuarios = 0

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));


const server = httpServer.listen(PORT, async () => {
    console.log(`Servidor Corriendo en el puerto: ${server.address().port}`)
});

server.on('error', function (e) {
    console.log('Error al conectar con el servidor');
    console.log(e);
});

//handlebars

app.engine('handlebars', handlebars.engine())
app.set('views', './public')
app.set('view engine', 'handlebars')

app.get("/", (req, res) => {
    let productList = product.getAll()
    let messages = message.getAll()
    res.render('index', { productList, messages })
})

io.on('connection', (socket) => {
    let now = new Date().toLocaleTimeString();
    console.log("--------------------------")
    console.log(`[${now}] Se conectó un usuario nuevo !!`)
    usuarios = usuarios + 1
    console.log(`Usuarios: ${usuarios}`)

    socket.on("newProduct", newProduct => {
        id = product.post(product)
        if (id) {
            newProduct.id = id
            io.sockets.emit("newProduct", newProduct)
        }
        else {
            io.sockets.emit("error")
        }

    })
    socket.on("newMessage", message => {
        message.date = new Date().toLocaleString()
        let newMessage = `<span id="email">${message.email}</span><span id="date">[${message.date}]</span><span id="data">: ${message.data}</span><br>`
        createMessage(message);

        io.sockets.emit("newMessage", newMessage)
    })
    socket.on("disconnect", () => {
        let now = new Date().toLocaleTimeString();
        console.log("--------------------------")
        console.log(`[${now}] Se desconectó un usuario !!`)
        usuarios = usuarios - 1
        console.log(`Usuarios: ${usuarios}`)
    })

})
function createMessage(newMessage) {
    message.post(newMessage)
}

