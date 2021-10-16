const articles = require('./articles')
const model = require('./models/articles-model')
const mockingoose = require('mockingoose')
const { get, find, findById } = require('./articles')

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
const _articles = [
  {
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
  },
  {
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
  },
]

beforeEach(() => {
  mockingoose(model).toReturn(_doc, 'findOne')
})

describe('article use cases', () => {
  test('get method', async () => {
    try {
      const founded = await articles.get('507f191e810c19729de860ea')
      expect(JSON.parse(JSON.stringify(founded))).toMatchObject(_doc)
    } catch (err) {
      console.log(err)
    }
  })
})

describe('test mongoose User model', () => {
  test('should return the doc with findById', () => {
    mockingoose(model).toReturn(_doc, 'findOne')
    return model.findById({ _id: '507f191e810c19729de860ea' }).then((_doc) => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc)
    })
  })
  //===========================================

  it('should return all articles list method', async () => {
    const listArticles = await articles.list()
    mockingoose(model).toReturn(listArticles)
    return model.find().then((list) => {
      expect(JSON.parse(JSON.stringify(listArticles))).toReturn(list)
    })
  })

  // it('should return the doc with update', () => {
  //   mockingoose(model).toReturn(_doc, 'update')

  //   return model
  //     .update({ name: 'changed' }) // this won't really change anything
  //     .where({ _id: '507f191e810c19729de860ea' })
  //     .then((_doc) => {
  //       expect(JSON.parse(JSON.stringify(_doc))).toMatchObject(_doc)
  //     })
  // })
})
