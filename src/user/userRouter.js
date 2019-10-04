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
module.exports= UsersRouter;