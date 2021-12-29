const Product = require('./src/models/Product');
const Message = require('./src/models/Message');
const productRouter = require('./src/routers/ProductRouter');
const messageRouter = require('./src/routers/MessageRouter');

const messageController = require("./src/controllers/MessageController")
const productController = require("./src/controllers/ProductController")
const express = require('express');
const handlebars = require('express-handlebars');

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require('socket.io');
const { throws } = require("assert");

const app = express();
const PORT = process.env.PORT || 8080
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
var usuarios = 0

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use('/api/productos', productRouter);
app.use('/api/mensajes', messageRouter);


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

app.get("/", async (req, res) => {
    try {
        let productList = await productController.getAll()
        let messages = await messageController.getAll()
        res.render('index', { productList, messages })
    }
    catch(err) {
        res.json(err)
    }
})

io.on('connection', (socket) => {
    let now = new Date().toLocaleTimeString();
    console.log("--------------------------")
    console.log(`[${now}] Se conectó un usuario nuevo !!`)
    usuarios = usuarios + 1
    console.log(`Usuarios: ${usuarios}`)

    socket.on("newProduct", async (title, price, thumbnail) => {
        console.log("post")
        let newProduct = new Product(null, title, price, thumbnail)
        id = await productController.post(newProduct)
        if (id) {
            newProduct.id = id
            io.sockets.emit("newProduct", newProduct)
        }
        else {
            console.log(id)
            io.sockets.emit("error")
        }

    })
    socket.on("newMessage", (email, data) => {
        let message = new Message(null, email, data)
        let newMessage = `<span id="email">${message.email}</span><span id="date">[${message.date}]</span><span id="data">: ${message.data}</span><br>`
        messageController.post(message).then(() => {
            io.sockets.emit("newMessage", newMessage)
        }).catch(err => {
            throw err
        })
    })
    socket.on("disconnect", () => {
        let now = new Date().toLocaleTimeString();
        console.log("--------------------------")
        console.log(`[${now}] Se desconectó un usuario !!`)
        usuarios = usuarios - 1
        console.log(`Usuarios: ${usuarios}`)
    })

})

