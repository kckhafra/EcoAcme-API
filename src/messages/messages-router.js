const express = require('express');
const MessagesRouter = express.Router();
const MessagesService = require('./messages-service')
const jsonBodyParser = express.json()

MessagesRouter
.get('/', (req,res,next)=>{
    const db = req.app.get('db')
    const {user_id}= req.query
    MessagesService.getAllUserMessages(db,user_id)
        .then(message=>{
            console.log(`All: ${message}`)
            res.json(message)
        })
        .catch(next)
})
.get('/convo', (req,res,next)=>{
    const db = req.app.get('db')
    const {user_id}= req.query
    const {receiver_id}=req.query
    MessagesService.getMessagesByConvo(db,user_id,receiver_id)
        .then(message=>{
            res.json(message)
        })
        .catch(next)
})


module.exports = MessagesRouter