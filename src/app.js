require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const authRouter = require('./auth/auth-router')
const postRouter = require('./post/post-router')
const friendRouter = require('./friends/friends-router')
const messageRouter = require('./messages/messages-router')
const usersRouter = require('./user/userRouter')
const app = express()
const commentRouter = require('./comments/comments-router')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())

app.use('/api/login', authRouter)
app.use('/api/post', postRouter)
app.use('/api/friends', friendRouter)
app.use('/api/messages', messageRouter)
app.use('/api/users', usersRouter)
app.use('/api/comments', commentRouter)


app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app