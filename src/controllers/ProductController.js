const ProductService = require('../services/ProductService');
const {optionsMariaDB} = require("../../options/MariaDB")
const knexMariaDB = require("knex")(optionsMariaDB)
const productService = new ProductService(knexMariaDB, "products")


class ProductController {

    async getAll() {
        return productService.getAll()
    }

    async getById(id) {
        return productService.getById(id)
    }

    async post(product) {
        return productService.post(product)
    }

    async update(product) {
        return productService.update(product)
    }

    async deleteById(id) {
        return productService.deleteById(id)
    }

}
module.exports = new ProductController()
