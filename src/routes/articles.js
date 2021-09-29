const { Router } = require('express')
const articlesRouter = Router()
const reader = require('../utils/reader.js')
const path = require('path')

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

module.exports = articlesRouter
