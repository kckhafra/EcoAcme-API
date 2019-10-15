const express = require('express');
const CommentsService = require('./comments-api-service')
const commentRouter = express.Router()
const jsonBodyParser = express.json()
const path = require('path')
const requireAuth = require('../middleware/jwt-auth')

commentRouter
  .route('/')
  .all(requireAuth)
  .get((req,res,next)=>{
    CommentsService.getComment(req.app.get('db'))
    .then(comm=>{
        res.json(comm)
    })
    .catch(next)
})
  .post( jsonBodyParser, (req, res, next) => {
    const { post_id, comments, user_id } = req.body
    const newComment = { post_id, comments, user_id }

    for (const [key, value] of Object.entries(newComment))
      if (value == null)
        return res.status(400).json({
          error: `Missing'${key}' in request body`
        })

    CommentsService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${comment.id}`))
          .json(comment)
      })
      .catch(next)
    })

// commentRouter
//   .route('/by_post/:post_id')
//   .all(requireAuth)
//   .get((req,res,next)=>{
//       const {post_id} = req.params
//       CommentsService.getCommentByPostId(req.app.get('db'),post_id)
//       .then(comm=>{
//         res.json(comm)
//         })
//         .catch(next)
//     })
commentRouter
  .route('/:comment_id')
  .all(requireAuth)
  .get((req,res,next)=>{
    const {comment_id} = req.params
    CommentsService.getCommentById(req.app.get('db'),comment_id)
    .then(comm=>{
      res.json({comm: comm[0]})
  })
  .catch(next)
  })
  .delete(jsonBodyParser,(req,res,next)=>{
    const db = req.app.get('db')
    const {comment_id} = req.params
    
    CommentsService.deleteComment(db, comment_id)
        .then(product=>{
            res.status(201).end()
        })
        .catch(next)
  

  })
  .patch(jsonBodyParser,(req,res,next)=>{
    const db = req.app.get('db')
    const {comment_id}=req.params
    const {comments,post_id,user_id} = req.body
    const updatedComment = {comments,post_id,user_id}
    
    CommentsService.updateComment(db,updatedComment, comment_id)
    .then(updatePost=>{
        res.json(updatePost)
    })
    .catch(next)
})

    

module.exports = commentRouter