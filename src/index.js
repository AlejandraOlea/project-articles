const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = require('./routes')

app.use('/api/v1/articles', router.articlesRouter)

app.listen(8080, () => {
  console.log('app is running on 8080')
})
