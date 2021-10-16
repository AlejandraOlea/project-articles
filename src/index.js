require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./database')
const jwt = require('jsonwebtoken')

const router = require('./routes')

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']
  console.log('aqui el token', token)
  if (!token) {
    res.status(401).send('not authorized at all')
    return
  }
  try {
    jwt.verify(token.split(' ')[1], process.env.SECRET_KEY)
  } catch (err) {
    res.status(401).send('NOT AUTHORIZED')
    return
  }
  next()
}

const performanceMiddleware = (req, res, next) => {
  console.time()
  next()
  console.timeEnd()
}

app.use(express.json())
app.use(performanceMiddleware)

// app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/auth', router.authRouter)
// app.use(authMiddleware)
app.use('/api/v1/articles', router.articlesRouter)
app.use('/api/v1/authors', router.authorsRouter)

app.listen(8080, () => {
  console.log('app is running on 8080')
})
