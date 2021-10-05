const mongoose = require('mongoose')
const { Schema } = mongoose

//Set up de la base de datos
const ArticleModelSchema = new Schema({
  id: String,
  title: String,
  url: String,
  keywords: [String],
  modifiedAt: Date,
  publishedAt: Date,
  author: String,
  readMins: Number,
  source: String,
})

//conectando el esquema con la base de datos, generamos un modelo.
const ArticleModel = mongoose.model('ArticleModel', ArticleModelSchema)

class Article {
  create(data) {
    const model = new ArticleModel(data)
    return new Promise((resolve, reject) => {
      return model.save((err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }
  get(id) {
    return new Promise((resolve, reject) => {
      return ArticleModel.findById(id, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }
}

module.exports = new Article()
