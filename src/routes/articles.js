const { Router } = require('express')
const articlesRouter = Router()
const validateBody = require('../utils/isValid')
const articlesModel = require('../database/articles')
const authorsModel = require('../database/authors')
const Service = require('../service')
const logger = require('../logger')

const service = new Service(articlesModel, authorsModel)

articlesRouter.get('/', async (req, res) => {
  try {
    const data = await service.listArticles()
    logger.info(`[Articles][List][Request]${JSON.stringify(req.params)}`)

    logger.info(`[Articles][List][Response]${JSON.stringify(data)}`)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    logger.error(`[Articles][List][Error]${JSON.stringify(error)}`)
    res.status(500).json(error)
  }
})

articlesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  logger.info(`[Articles][GetById][Request]${JSON.stringify(req.params)}`)

  try {
    const founded = await service.getArticleById(id)
    logger.info(`[Articles][GetById][Response]${JSON.stringify(founded)}`)
    console.log('==founded by id=>', founded)
    res.status(200).json(founded)
  } catch (error) {
    logger.error(`[Articles][GetById][Error]${JSON.stringify(error)}`)
    res.status(500).json(error)
  }
})

articlesRouter.post('/', async (req, res) => {
  // validateBody(req, res)
  try {
    logger.info(`[Articles][Create][Request]${JSON.stringify(req.body)}`)
    const article = await service.createArticle(req)
    logger.info(`[Articles][Create][Response]${JSON.stringify(article)}`)
    console.log(article)
    res.status(200).json(article)
  } catch (error) {
    logger.error(`[Articles][Create][Error]${JSON.stringify(error)}`)
    res.status(500).json(error)
    console.log(error)
  }
})

articlesRouter.patch('/:id', async (req, res) => {
  // validateBody(req, res)
  const { id } = req.params
  logger.info(`[Articles][Update][Request]${JSON.stringify(req.params)}`)
  try {
    const founded = await service.updateArticle(id)
    logger.info(`[Articles][[Update][Response]${JSON.stringify(founded)}`)
    console.log('==founded es: =>', founded)
    res.status(200).json(founded)
  } catch (err) {
    logger.err(`[Articles][Update][Error]${JSON.stringify(error)}`)
    res.status(500).json(err)
  }
})
articlesRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  logger.info(`[Articles][Update][Request]${JSON.stringify(req.params)}`)
  try {
    const founded = await service.put(id)
    logger.info(`[Articles][[Update][Response]${JSON.stringify(founded)}`)
    console.log('==founded es: =>', founded)
    res.status(200).json(founded)
  } catch (err) {
    logger.err(`[Articles][Update][Error]${JSON.stringify(error)}`)
    res.status(500).json(err)
  }
})

articlesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  logger.info(`[Articles][Delete][Request]${JSON.stringify(req.params)}`)
  try {
    const articles = await service.removeArticle(id)
    logger.info(`[Articles][Delete][Request]${JSON.stringify(article)}`)
    console.log('Article Successfully Deleted')
    res.status(200).send('Article Successfully Deleted')
  } catch (err) {
    logger.err(`[Articles][Delete][Error]${JSON.stringify(error)}`)
    console.log('ERROR EN DELETE', err)
    res.status(404).send(err)
  }
})
module.exports = articlesRouter
