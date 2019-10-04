const express = require('express');
const jsonBosyParser = express.json();
const postRouter = express.Router();
const PostService = require('./post-service')

postRouter
    .get('/', (req,res,next)=>{
        const db = req.app.get('db')
        PostService.getAllPost(db)
        .then(post=>{
            res.json(post)
        })
    })

    module.exports = postRouter