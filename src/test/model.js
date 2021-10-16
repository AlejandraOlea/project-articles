const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = Schema({
  name: String,
  email: String,
  created: { type: Date, default: Date.new },
})

module.exports = mongoose.model('User', schema)
