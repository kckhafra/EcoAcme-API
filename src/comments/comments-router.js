const express = require('express');
const CommentsService = require('./comments-api-service')
const commentRouter = express.Router()
const jsonBodyParser = express.json()
const path = require('path')

commentRouter
  .route('/')
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
          error: `Missing '${key}' in request body`
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

commentRouter
    .route('/:post_id')
    .get((req,res,next)=>{
        const {post_id} = req.params
        CommentsService.getCommentByPostId(req.app.get('db'),post_id)
        .then(comm=>{
            console.log(comm)
            res.json(comm)
        })
        .catch(next)
})
    

module.exports = commentRouter