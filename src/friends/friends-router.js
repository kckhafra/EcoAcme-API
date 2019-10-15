const express = require('express');
const FriendsRouter = express.Router();
const FriendsService = require('./friends-service')
const jsonBodyParser = express.json()
const requireAuth = require('../middleware/jwt-auth')

FriendsRouter
    .route('/')
    .all(requireAuth)
    .get((req,res,next)=>{
        const db = req.app.get('db')
        const {user_id}= req.query
        console.log(user_id)
        FriendsService.getAllFriends(db,user_id)
            .then(friends=>{
                res.json(friends)
            })
            .catch(next)
    })
    .post(jsonBodyParser,(req,res,next)=>{
        const db=req.app.get('db')
        const {friend_request_id,friend_receiver_id} = req.body
        const friendMatch = {friend_request_id,friend_receiver_id}
        FriendsService.postFriends(db,friendMatch)
            .then(friends=>{
                res.json(friends)
            })
            .catch(next)
    })
    .delete(jsonBodyParser,(req,res,next)=>{
        const db = req.app.get('db')
        const {friend_request_id,friend_receiver_id} = req.body
        
        FriendsService.deleteFriend(db,friend_request_id,friend_receiver_id )
            .then(product=>{
                res.status(201).end()
            })
            .catch(next)
    
    })

FriendsRouter
    .route('/request')
    .all(requireAuth)
    .get((req,res,next)=>{
        const db = req.app.get('db')
        const {user_id}= req.query
        console.log(user_id)
        FriendsService.getFriendRequestById(db,user_id)
            .then(friends=>{
                res.json(friends)
            })
            .catch(next)
    })

FriendsRouter
    .route('/receiver')
    .all(requireAuth)
    .get((req,res,next)=>{
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