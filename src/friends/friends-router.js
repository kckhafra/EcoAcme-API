const express = require('express');
const FriendsRouter = express.Router();
const FriendsService = require('./friends-service')
const jsonBodyParser = express.json()

FriendsRouter
    .get('/', jsonBodyParser, (req,res,next)=>{
        const db = req.app.get('db')
        const {user_id}= req.query
        console.log(user_id)
        FriendsService.getAllFriends(db)
            .then(friends=>{
                res.json(friends)
            })
            .catch(next)
    })

    .get('/request', (req,res,next)=>{
        const db = req.app.get('db')
        const {user_id}= req.query
        console.log(user_id)
        FriendsService.getFriendRequestById(db,user_id)
            .then(friends=>{
                res.json(friends)
            })
            .catch(next)
    })
    .get('/receiver', (req,res,next)=>{
        const db = req.app.get('db')
        const {user_id}= req.query
        console.log(user_id)
        FriendsService.getFriendReceiverById(db,user_id)
            .then(friends=>{
                res.json(friends)
            })
            .catch(next)
    })

    module.exports = FriendsRouter