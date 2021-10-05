const { Router } = require('express')
const articlesRouter = Router()
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const dbWriter = require('../utils/writer.js')
const reader = require('../utils/reader.js')
const validateBody = require('../utils/isValid')
const { writer } = require('repl')
const articleModel = require('../database/articles')

articlesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const founded = await articleModel.get(id)
    console.log('==founded es: =>', founded)
    res.status(200).json(founded)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

articlesRouter.post('/', async (req, res) => {
  const data = req.body
  try {
    const article = await articleModel.create(data)
    console.log('hola', article)
    res.status(200).json(article)
  } catch (err) {
    console.log(err)
  }
})

// articlesRouter.patch('/id', async (req, res) => {
//   const { id } = req.params
//   const data = req.body
//   const isValid = validateBody(req, res)
//   if (isValid) {
//     try {
//       const article = await articleModel.update(id, data)
//       console.log('==article==', article)
//     } catch (err) {
//       console.log(err)
//       res.status(404).send('An error has occurred')
//     }
//   }
// })

// articlesRouter.put('/', async (req, res) => {
//   const { id, title, url, keywords, author, readMins, source } = req.body
//   const db = await reader(path.resolve(__dirname, '../db/db.json'))
//   const founded = db.find((e) => e.id === id)
//   if (!founded) {
//     const isValid = validateBody(req, res)
//     if (isValid) {
//       const newArticle = {
//         ...req.body,
//         id: uuidv4(),
//         publishedAt: moment().format('MM/DD/YY'),
//         modifiedAt: moment().format('MM/DD/YY'),
//       }
//       const articles = await reader(path.resolve(__dirname, '../db/db.json'))
//       console.log(articles)
//       articles.push(newArticle)
//       await dbWriter(articles)
//       res.status(200).send(newArticle)
//       return
//     } else {
//       res.status(500).send('TOTAL Invalid article')
//     }
//   } else {
//     const isValid = validateBody(req, res)
//     if (isValid) {
//       const editedArticle = {
//         ...founded,
//         ...req.body,
//         publishedAt: founded.publishedAt,
//         modifiedAt: moment().format('MM/DD/yyyy'),
//       }
//       const index = db.findIndex((e) => e.id === id)
//       db[index] = editedArticle
//       await dbWriter(db)
//       res.status(200).json(editedArticle)
//     }
//   }
// })

articlesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const articles = await articleModel.remove(id)
    res.status(200).send(articles)
  } catch (err) {
    console.log('ERROR EN DELETE', err)
    res.status(404).send(err)
  }
})
module.exports = articlesRouter
