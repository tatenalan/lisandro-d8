const MessageService = require('../services/MessageService');
const {optionsSQLite} = require("../../options/SQLite")
const knexSQLite = require("knex")(optionsSQLite)
const messageService = new MessageService(knexSQLite, "messages")


class MessageController {

    async getAll() {
        return messageService.getAll();
    }

    async getByEmail(email) {
        return messageService.getByEmail(email)
    }

    async post(message) {
        return messageService.post(message)
    }

    async update(message) {
        return messageService.update(message)
    }

    async deleteById(id) {
        return messageService.deleteById(id)
    }
}
module.exports = new MessageController()
