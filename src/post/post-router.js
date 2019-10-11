const express = require('express');
const jsonBosyParser = express.json();
const postRouter = express.Router();
const PostService = require('./post-service')
const requireAuth = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()

postRouter
    .route('/')
    .all(requireAuth)
    .get((req,res,next)=>{
        const db = req.app.get('db')
        PostService.getAllPost(db)
        .then(post=>{
            res.json(post)
        })
    })
    .post(jsonBosyParser,(req,res,next)=>{
        const db = req.app.get('db')
        const {post,user_id,images} = req.body
        const newPost = {post,user_id,images}
        PostService.insertPost(db, newPost)
        .then(post=>{
            res.json({post:post[0]})
        })
        .catch(next)
    })

postRouter
    .route('/:postId')
    .delete((req,res,next)=>{
        const db = req.app.get('db')
        PostService.deletePost(db, req.params.postId)
            .then(post=>{
                res
                .json(post)
            })
            .catch(next)
    })
    .patch(jsonBodyParser,(req,res,next)=>{
        const db = req.app.get('db')
        const {postId}=req.params
        const {post,images} = req.body
        updatePost = {post,images}
        PostService.updatePost(db,postId,updatePost)
        .then(updatePost=>{
            res.json(updatePost)
        })
        .catch(next)
    })

    module.exports = postRouter