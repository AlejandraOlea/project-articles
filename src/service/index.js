// const validateBody = require('../utils/isValid')
const moment = require('moment')

class Service {
  constructor(articlesDb, authorsDb) {
    this.articlesDb = articlesDb
    this.authorsDb = authorsDb
  }

  async listArticles() {
    return await this.articlesDb.list()
  }
  async listAuthors() {
    return await this.authorsDb.list()
  }

  async getArticleById(id) {
    return await this.articlesDb.get(id)
  }

  async createArticle(req) {
    // validateBody(req, res)
    //preguntar si el autor existe
    const newArticle = {
      ...req.body,
      publishedAt: moment().format('MM/DD/YYYY'),
      modifiedAt: moment().format('MM/DD/YYYY'),
    }
    const createdArticle = await this.articlesDb.create(newArticle)
    console.log(createdArticle)
    const foundedAuthor = await this.authorsDb.getByName(newArticle.author)
    console.log(foundedAuthor)
    if (!foundedAuthor) {
      console.log('no se encontro el autor')
      //crear el author
      const newAuthor = {
        name: newArticle.author,
        articles: [createdArticle._id],
      }
      await this.authorsDb.create(newAuthor)
      // await this.authorsDb.update({ articles: [article._id] })
      return createdArticle
    } else {
      const authorArticles = foundedAuthor.articles
      authorArticles.push(createdArticle._id)
      const editedAuthor = {
        name: foundedAuthor.name,
        articles: authorArticles,
      }
      console.log('PUSH', authorArticles)
      await this.authorsDb.update(foundedAuthor, editedAuthor)
      return createdArticle
    }
  }

  async updateArticle(data) {
    const { id } = req.params
    const founded = await service.updateArticle(id)
    if (!founded) {
      console.log('article not found')
    }
    return await this.articlesDb.update(data)
  }

  async put(id) {
    return await this.articlesDb.update(id)
  }

  async removeArticle(id) {
    return await this.articlesDb.remove(id)
  }
}

module.exports = Service
