const ServiceException = require("../exceptions/ServiceException")

class MessageService {
    constructor(knex, table) {
        this.knex = knex;
        this.table = table;
    }

    post(message) {
        return this.knex(this.table).insert(message, "id")
        .then((result) => {
            console.log("Mensaje Creado"); 
            message.id = result[0].toString();
            return message
        })
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudo crear el mensaje")})
    }

    update(message) {
        console.log(message)
        return this.knex(this.table).where({id: message.id}).update(message)
        .then(() => {console.log(`Mensaje con id ${message.id} actualizado`); return {response: `Mensaje con id ${message.id} actualizado`}})
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudo actualizar el mensaje")})
    }

    getByEmail(email) {
        return this.knex.from(this.table).select("*").where({email: email})
        .then((message) => {
            if(message.length)
                return message
            else{
                return {response: `Mensajes con email ${email} no han sido encontrados`}
            }
        })
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudo traer el mensaje con email: " + email)})
    }

    getAll() {
        return this.knex.from(this.table).select("*")
        .then((messages) => {return messages})
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudieron traer los mensajes")})
    }

    deleteById(id) {
        return this.knex(this.table).where({id: id}).del()
        .then(() => {console.log(`Mensaje con id ${id} eliminado`); return {response: `Mensaje con id ${id} eliminado`}})
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudo eliminar el mensaje con id: " + id)})
    }
    deleteAll() {
        return this.knex(this.table).del()
        .then(() => {console.log("Todos los mensajes fueron eliminados"); return {response: "Todos los mensajes fueron eliminados"}})
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudieron eliminar los mensajes")})
    }
}

module.exports = MessageService