const express = require('express');
const MessagesRouter = express.Router();
const MessagesService = require('./messages-service')
const jsonBodyParser = express.json()
const requireAuth = require('../middleware/jwt-auth')

MessagesRouter
.route('/')
.all(requireAuth)
.get( (req,res,next)=>{
    const db = req.app.get('db')
    const {user_id}= req.query
    MessagesService.getAllUserMessages(db,user_id)
        .then(message=>{
            console.log(`All: ${message}`)
            res.json(message)
        })
        .catch(next)
})
.post(jsonBodyParser,(req,res,next)=>{
    const db = req.app.get('db')
    const {sender_id,receiver_id,messages,date_created} = req.body
    
    const newMessage = {sender_id,receiver_id,messages,date_created}
    MessagesService.postMessage(db,newMessage)
    .then(mess=>{
        console.log(mess)
        res.json(mess)
    })

    .catch(next)
})

MessagesRouter
.route('/convo')
.get((req,res,next)=>{
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