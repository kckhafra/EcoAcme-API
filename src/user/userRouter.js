const express = require('express');
const UsersRouter = express.Router();
const UserService = require('./user-api-service')
const jsonBodyParser = express.json()

UsersRouter
.get('/', (req,res,next)=>{
    UserService.getAllUsers(req.app.get('db'))
.then(users=>{
    res.json(users)
})
.catch(next)
})

UsersRouter
.get('/:id', (req,res,next)=>{
    const {id} = req.params
    UserService.getUserById(req.app.get('db'),id)
.then(users=>{
    res.json(users)
})
.catch(next)
})

module.exports= UsersRouter;