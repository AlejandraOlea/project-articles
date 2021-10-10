const { Router } = require('express')
const articlesRouter = Router()
const path = require('path')
const moment = require('moment')
const validateBody = require('../utils/isValid')
const articleModel = require('../database/articles')
const authorModel = require('../database/authors')
const Service = require('../service')
const service = new Service(articleModel, authorModel)

articlesRouter.get('/', async (req, res) => {
  try {
    const data = await service.listArticles()
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

articlesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const founded = await service.getArticle(id)
    console.log('==founded es: =>', founded)
    res.status(200).json(founded)
  } catch (err) {
    res.status(500).json(err)
  }
})

articlesRouter.post('/', async (req, res) => {
  // validateBody(req, res)
  try {
    const article = await service.createArticle(req.body)
    console.log(article)
    res.status(200).json(article)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

articlesRouter.patch('/:id', async (req, res) => {
  // validar input
  const { id } = req.params
  try {
    const founded = await service.updateArticle(id)
    console.log('==founded es: =>', founded)
    res.status(200).json(founded)
  } catch (err) {
    res.status(500).json(err)
  }
})
articlesRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const founded = await service.put(id)
    console.log('==founded es: =>', founded)
    res.status(200).json(founded)
  } catch (err) {
    res.status(500).json(err)
  }
})

articlesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const articles = await service.remove(id)
    console.log('Article Successfully Deleted')
    res.status(200).send('Article Successfully Deleted')
  } catch (err) {
    console.log('ERROR EN DELETE', err)
    res.status(404).send(err)
  }
})
module.exports = articlesRouter
