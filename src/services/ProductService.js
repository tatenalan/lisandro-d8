const ServiceException = require("../exceptions/ServiceException")

class ProductService {
    constructor(knex, table) {
        this.knex = knex;
        this.table = table;
    }

    post(product) {
        return this.knex(this.table).insert(product, "id")
        .then((result) => {console.log("Producto Creado"); return result[0].toString();})
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudo crear el producto")})
    }

    update(product) {
        return this.knex(this.table).where({id: product.id}).update(product)
        .then(() => {console.log(`Producto con id ${product.id} actualizado`); return {response: `Producto con id ${product.id} actualizado`}})
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudo actualizar el producto")})
    }

    getById(id) {
        return this.knex.from(this.table).select("*").where({id: id})
        .then((product) => {return product})
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudo traer el producto con id: " + id)})
    }

    getAll() {
        return this.knex.from(this.table).select("*")
        .then((products) => {return products})
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudieron traer los productos")})
    }

    deleteById(id) {
        return this.knex(this.table).where({id: id}).del()
        .then(() => {console.log(`Producto con id ${id} eliminado`); return {response: `Producto con id ${id} eliminado`}})
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudo eliminar el producto con id: " + id)})
    }

    deleteAll() {
        return this.knex(this.table).del()
        .then(() => {console.log("Todos los productos fueron eliminados"); return {response: "Todos los productos fueron eliminados"}})
        .catch((error) => {console.log(error); throw new ServiceException(500, "No se pudieron eliminar los productos")})
    }
}
module.exports = ProductService