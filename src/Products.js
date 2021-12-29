class Productos {
    constructor(knex, table) {
        this.knex = knex;
        this.table = table;
    }

    post(product) {
        this.knex("products").insert(product, "id")
        .then((result) => {console.log("data inserted"); return result})
        .catch((error) => {console.log(error); throw error})
        .finally(() => {
            this.knex.destroy();
        })
    }

    async update(id, product) {
        this.knex("products").where({id: id}).update(product)
        .then(() => console.log("data update"))
        .catch((error) => {console.log(error); throw error})
        .finally(() => {
            this.knex.destroy();
        })
    }

    async getById(id) {
        this.knex.from("products").select("*").where({id: id})
        .then((product) => {return product})
    }

    async getAll() {
        this.knex.from("products").select("*")
        .then((products) => {return products})
    }

    async deleteById(id) {
        this.knex("products").where({id: id}).del()
    }
    deleteAll() {
        this.knex("products").del()
    }
}
module.exports = Productos
