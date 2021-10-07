const { Router } = require('express')
const articlesRouter = Router()
const path = require('path')
const moment = require('moment')
const validateBody = require('../utils/isValid')
const articleModel = require('../database/articles')

articlesRouter.get('/', async (req, res) => {
  try {
    const data = await articleModel.list()
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

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
    console.log('hola desde article/post', article)
    res.status(200).json(article)
  } catch (err) {
    console.log(err)
  }
})

articlesRouter.patch('/:id', async (req, res) => {
  const { id } = req.params
  const found = await articleModel.get(id)
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
      await articleModel.update(id, editedArticle)
      res.status(200).send('Article Successfully modified')
      console.log(editedArticle)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
})

articlesRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const found = await articleModel.get(id)
  console.log('FFFFF', found)
  if (!found) {
    const data = req.body
    try {
      const article = await articleModel.create(data)
      console.log('hola desde article/post', article)
      res.status(200).json(article)
    } catch (err) {
      console.log(err)
    }
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
      await articleModel.update(id, editedArticle)
      res.status(200).send('Article Successfully modified')
      console.log(editedArticle)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
})

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
