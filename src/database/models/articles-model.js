const mongoose = require('mongoose')
const { Schema } = mongoose

//Set up de la base de datos
const ArticleModelSchema = new Schema({
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
module.exports = ArticleModel
