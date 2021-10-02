const { Router } = require('express')
const articlesRouter = Router()
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const dbWriter = require('../utils/writer.js')
const reader = require('../utils/reader.js')
const validateBody = require('../utils/isValid')
const { writer } = require('repl')

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

articlesRouter.patch('/', async (req, res) => {
  const { id, title, url, keywords, author, readMins, source } = req.body
  const db = await reader(path.resolve(__dirname, '../db/db.json'))
  const founded = db.find((e) => e.id === id)

  if (!founded) {
    res.status(404).send('Not Found')
  } else {
    const isValid = validateBody(req, res)
    if (isValid) {
      const editedArticle = {
        ...founded,
        ...req.body,
        publishedAt: founded.publishedAt,
        modifiedAt: moment().format('MM/DD/yyyy'),
      }
      const index = db.findIndex((e) => e.id === id)
      db[index] = editedArticle
      await dbWriter(db)

      res.status(200).json(editedArticle)
    }
  }
})
articlesRouter.put('/', async (req, res) => {
  const { id, title, url, keywords, author, readMins, source } = req.body
  const db = await reader(path.resolve(__dirname, '../db/db.json'))
  const founded = db.find((e) => e.id === id)
  if (!founded) {
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
  } else {
    const isValid = validateBody(req, res)
    if (isValid) {
      const editedArticle = {
        ...founded,
        ...req.body,
        publishedAt: founded.publishedAt,
        modifiedAt: moment().format('MM/DD/yyyy'),
      }
      const index = db.findIndex((e) => e.id === id)
      db[index] = editedArticle
      await dbWriter(db)
      res.status(200).json(editedArticle)
    }
  }
})

articlesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const articles = await reader(path.resolve(__dirname, '../db/db.json'))
    const filteredArticles = articles.filter((e) => e.id !== id)
    if (!filteredArticles) {
      res.status(404).send('not found')
      return
    }
    await dbWriter(filteredArticles)
    res.status(200).send(filteredArticles)
    return
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
module.exports = articlesRouter
