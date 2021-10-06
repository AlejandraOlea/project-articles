const { Router } = require('express')
// const articlesRouter = Router()
const authorsRouter = Router()
const path = require('path')
const moment = require('moment')
const validateBody = require('../utils/isValid')
const authorsModel = require('../database/authors')

authorsRouter.get('/', async (req, res) => {
  try {
    const data = await authorsModel.list()
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

authorsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const founded = await authorsModel.get(id)
    console.log('==founded es: =>', founded)
    res.status(200).json(founded)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

authorsRouter.post('/', async (req, res) => {
  const data = req.body
  try {
    const article = await authorsModel.create(data)
    console.log('hola', article)
    res.status(200).json(article)
  } catch (err) {
    console.log(err)
  }
})

authorsRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  const found = await authorsModel.get(id)
  console.log('FFFFF', found)
  if (!found) {
    res.status(404).send('Not Found')
  } else {
    // const isValid = validateBody(req, res)
    // if (isValid) {
    const editedArticle = {
      ...found._doc,
      ...req.body,
      modifiedAt: moment().format('MM/DD/yyyy'),
    }
    console.log('BODY', req.body)
    console.log('OOOOO', editedArticle)
    try {
      await authorsModel.update(id, editedArticle)
      res.status(200).send('Success')
      console.log(editedArticle)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
})

authorsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const articles = await authorsModel.remove(id)
    res.status(200).send(articles)
  } catch (err) {
    console.log('ERROR EN DELETE', err)
    res.status(404).send(err)
  }
})
module.exports = authorsRouter
