const articlesService = require('./index')
const mockingoose = require('mockingoose')
const articles = require('../database/articles')
const authors = require('../database/authors')
const service = new articlesService(articles, authors)
const model = require('../database/models/articles-model')

const _doc = {
  id: '507f191e810c19729de860ea',
  title: 'prueba1111',
  url: 'https://www.prueba1.com',
  keywords: ['A', 'B', 'C'],
  author: 'Alejandra Olea P.',
  readMins: 10,
  source: 'OMG SUPER ARTICLES',
  id: '0ae5afe3-b1f5-401e-941d-dbf0d50d82f9',
  publishedAt: '10/02/21',
  modifiedAt: '10/02/2021',
}

beforeAll(() => {
  mockingoose(model).toReturn(_doc, 'findOne')
})

describe('articles use cases', () => {
  it('Should return an error if id is not valid', async () => {
    try {
      const response = await service.getArticleById({ params: { id: '123' } })
      expect(response).toBe('invalid id')
    } catch (err) {}
  })

  //TO-DO probar ocn try catch
  it('should match with id', async () => {
    const response = await service.getArticleById({ params: { id: '507f191e810c19729de860ea' } })
    expect(JSON.parse(JSON.stringify(response))).toMatchObject(_doc)
  })
})
it('should return not found', async () => {
  mockingoose(model).toReturn(null, 'findOne')
  const response = await service.getArticleById({ params: { id: '507f191e810c19729de860e' } })
  expect(response).toBe('Not found')
})
