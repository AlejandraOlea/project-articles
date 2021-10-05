const express = require('express')
const app = express()
//llama instanciacion de la base de datos desde database/index.js
const db = require('./database')
const router = require('./routes')

console.log('DB==CONEXION===>', db.connection)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/articles', router.articlesRouter)

app.listen(8080, () => {
  console.log('app is running on 8080')
})
