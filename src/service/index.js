// const validateBody = require('../utils/isValid')

class Service {
  constructor(articlesDb, authorsDb) {
    this.articlesDb = articlesDb
    this.authorsDb = authorsDb
  }

  async listArticles() {
    return await this.articlesDb.list()
  }
  async getArticleById(Id) {
    return await this.articlesDb.get(Id)
  }

  async createArticle(data) {
    //validate data
    const { author } = data

    //partir transaccion
    const article = await this.articlesDb.create(...data)

    //preguntar si el autor existe
    const foundedAuthor = await this.authorsDb.getByName(author)
    if (!foundedAuthor) {
      //crear el author
      await this.authorsDb.create(data.author, [article.id])
      return
    }
    await this.authorsDb.update()
  }

  async updateArticle(data) {
    return await this.articlesDb.update(data)
  }

  async putArticle(data) {
    return await this.articlesDb.update(data)
  }

  createAuthor() {}
  getArticle() {}
  getAuthor() {}
}

module.exports = Service
