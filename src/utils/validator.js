const yup = require('yup')
const { dbArray, noValid } = require('./arrays')

const validator = (data) => {
  // const parseData = data
  // console.log(parseData)

  let schema = yup.object().shape({
    id: yup.string().length(36).required(),
    title: yup.string().min(1).max(255).required(),
    url: yup.string().required(),
    keywords: yup.array().min(1).max(3).required(),
    modifiedAt: yup.date().required(),
    publishedAt: yup.date(),
    author: yup.string().max(100).required(),
    readMins: yup.number().min(1).max(20).required(),
    source: yup.string().required(),
  })

  return schema
    .validate(data)
    .then(function (valid) {
      console.log('===VALID====', valid)
      // dbArray.push(data)
      // console.log('Array', dbArray)
      return true
    })
    .catch(function (err) {
      console.log('===NO VALID====', err)
      if (err) {
        // noValid.push(data)
        console.log('Array', noValid)
        return false
      }
    })
}

module.exports = validator