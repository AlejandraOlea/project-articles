const { Router } = require('express')
const articlesRouter = Router()
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

const dbWriter = require('../utils/writer.js')
const reader = require('../utils/reader.js')

articlesRouter.get('/', async (req, res) => {
  try {
    const data = await reader(path.resolve(__dirname, '../db/db.json'))
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
articlesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = await reader(path.resolve(__dirname, '../db/db.json'))
    const founded = data.find((e) => e.id === id)
    if (!founded) {
      res.status(404).send('not found')
      return
    }
    res.status(200).send(founded)
    return
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

function validateBody(req, res) {
  if (!req.body.title) res.status(400).send('title is missing')
  if (!req.body.url) res.status(400).send('url is missing')
  if (!req.body.keywords) res.status(400).send('keywords is missing')
  if (!Array.isArray(req.body.keywords)) {
    res.status(404).send('keyword is empty')
  }
  if (req.body.keywords.length === 0) {
    res.status(400).send()
  }
  if (!req.body.author) res.status(400).send('author is missing')
  if (!req.body.readMins) res.status(400).send('readMins is missing')
  if (!req.body.source) res.status(400).send('source is missing')
  return true
}

articlesRouter.post('/', async (req, res) => {
  const { title, url, keywords, author, readMins, source } = req.body
  // console.log(req.body)
  const isValid = validateBody(req, res)

  if (isValid) {
    const newArticle = {
      ...req.body,
      id: uuidv4(),
      publishedAt: moment().format('MM/DD/YY'),
      modifiedAt: moment().format('MM/DD/YY'),
    }
    const articles = await reader(path.resolve(__dirname, '../db/db.json'))
    console.log(articles)
    articles.push(newArticle)
    await dbWriter(articles)
    res.status(200).send(newArticle)
    return
  } else {
    res.status(500).send('TOTAL Invalid article')
  }
})

module.exports = articlesRouter

// articles.router.patch('/update', (req, res) => {
//   const { title, url, keywords, author, readMins, source } = req.body
//   //hacemos el read
//   const db = []
//   const founded = db.find((e) => e.id === id)
//   if (!founded)
//     if (title) {
//       founded.title = title
//     }
//   if (url) {
//     founded.url = url
//   }

//   return founded
// })

// //si no existe lo crea
// articles.router.put('/update', (req, res) => {
//   const { title, url, keywords, author, readMins, source } = req.body
//   //hacemos el read
//   const db = []
//   const founded = db.find((e) => e.id === id)
//   if (!founded)
//     if (title) {
//       founded.title = title
//     }
//   if (url) {
//     founded.url = url
//   }

//   return founded
// })

//codigo anterior
// const isArticleValid = await validator(newArticle)
// console.log(isArticleValid)

// if (isArticleValid) {
//   const articles = await reader(path.resolve(__dirname, '../db/db.json'))
//   articles.push(newArticle)

//   writeDb(articles)
//   res.status(200).send(newArticle)
// } else {
//   res.status(500).send('TOTAL Invalid article')
// }
// })
