const mongoose = require('mongoose')
const { Schema } = mongoose

//Set up de la base de datos
const AuthorsModelSchema = new Schema({
  authorName: String,
  articles: [String],
})

//conectando el esquema con la base de datos, generamos un modelo.
const AuthorsModel = mongoose.model('AuthorsModel', AuthorsModelSchema)

class Author {
  list() {
    return new Promise((resolve, reject) => {
      return AuthorsModel.find({}, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }
  get(id) {
    return new Promise((resolve, reject) => {
      return AuthorsModel.findById(id, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }
  create(data) {
    const model = new AuthorsModel(data)
    return new Promise((resolve, reject) => {
      return model.save((err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(data)
      })
    })
  }
  update(id, data) {
    return new Promise((resolve, reject) => {
      return AuthorsModel.findByIdAndUpdate(id, data, (err, result) => {
        console.log('DATA FROM UPDATE DATABASE', data)
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  }
  remove(id) {
    return new Promise((resolve, reject) => {
      return AuthorsModel.findByIdAndRemove(id, (err, data) => {
        if (err) {
          return reject(err)
        }
        return resolve(console.log('Removed Author: ', data))
      })
    })
  }
}

module.exports = new Author()
