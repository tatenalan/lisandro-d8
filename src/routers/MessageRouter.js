const express = require("express");
const messageController = require("../controllers/MessageController");
const messageRouter = express.Router();
const Message = require('../models/Message');

messageRouter.get('/:email?', (req, res) => {
    if(req.params.email)
        messageController.getByEmail(req.params.email).then(product => {
            res.json(product)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
    else
        messageController.getAll().then(messages => {
            res.json(messages)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
})

messageRouter.post('/', (req, res) => {
        messageController.post(new Message(null, req.body.email, req.body.data)).then(response => {
            res.json(response)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })   
})

messageRouter.put('/:id', (req, res) => {
        messageController.update(new Message(req.body.id, req.body.email, req.body.data)).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
})

messageRouter.delete('/:id', (req, res) => {
        messageController.deleteById(req.params.id).then((response) => {
            res.json(response)
        }).catch(err => {
            res.status(500)
            res.json(err)
        })
})


module.exports = messageRouter;