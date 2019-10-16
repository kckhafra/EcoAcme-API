const express = require('express');
const jsonBosyParser = express.json();
const postRouter = express.Router();
const PostService = require('./post-service')
const requireAuth = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()

postRouter
    .route('/')
    // .all(requireAuth)
    .get((req,res,next)=>{
        const db = req.app.get('db')
        PostService.getAllPost(db)
        .then(post=>{
            res.json(post)
        })
        .catch(next)
    })
    .post(jsonBosyParser,(req,res,next)=>{
        const db = req.app.get('db')
        const {post,user_id,post_images} = req.body
        const newPost = {post,user_id,post_images}
        PostService.insertPost(db, newPost)
        .then(post=>{
            res.json({post:post[0]})
        })
        .catch(next)
    })

postRouter
    .route('/:postId')
    // .all(requireAuth)
    .get((req,res,next)=>{
        const db = req.app.get('db')
        const {postId}=req.params
        PostService.getPostById(db,postId)
        .then(post=>{
            res.json({post:post[0]})
        })
        .catch(next)
    })
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
        const {post,post_images} = req.body
        updatePost = {post,post_images}
        PostService.updatePost(db,postId,updatePost)
        .then(updatePost=>{
            res.json({updatePost:updatePost[0]})
        })
        .catch(next)
    })

    module.exports = postRouter