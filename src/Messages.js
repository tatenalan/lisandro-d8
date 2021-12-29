class Messages {
    constructor(knex, table) {
        this.knex = knex;
        this.table = table;
    }

    post(message) {
        this.knex(this.table).insert(message)
        .then(() => console.log("data inserted"))
        .catch((error) => {console.log(error); throw error})
        .finally(() => {
            this.knex.destroy();
        })
    }

    async update(id, message) {
        this.knex(this.table).where({id: id}).update(message)
        .then(() => console.log("data update"))
        .catch((error) => {console.log(error); throw error})
        .finally(() => {
            this.knex.destroy();
        })
    }

    async getById(id) {
        return this.knex.from(this.table).select("*").where({id: id})
        .then((message) => {return message})
    }

    async getAll() {
        return this.knex.from(this.table).select("*")
        .then((messages) => {return messages})
    }

    async deleteById(id) {
        this.knex(this.table).where({id: id}).del()
    }
    deleteAll() {
        this.knex(this.table).del()
    }
}
module.exports = Messages
