class Message {
    constructor(id, email, data) {
        this.id = id;
        this.email = email;
        this.date = new Date().toLocaleTimeString();
        this.data = data
    }
}
module.exports = Message
        