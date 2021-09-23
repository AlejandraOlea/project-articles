const { readdir, readFile } = require('fs')
const { promisify } = require('util')
const yup = require('yup')
const promisifiedReadDir = promisify(readdir)
const promisifiedReadFile = promisify(readFile)

const validator = (data) => {
  const parseData = JSON.parse(data)
  // console.log(parseData)

  let schema = yup.object().shape({
    id: yup.string().length(36).required(),
    title: yup.string().min(1).max(255).required(),
    url: yup.string().required(),
    keywords: yup.string().min(1).max(3).required(),
    modifiedAt: yup.date().required(),
    publishedAt: yup.date(),
    author: yup.string().max(100).required(),
    readMins: yup.number().min(1).max(20).required(),
    source: yup.string().required(),
  })

  // check validity
  schema
    .validate(parseData)
    .then(function (valid) {
      console.log(valid) // => true
    })
    .catch(function (err) {
      console.log(err)
    })
}

async function main() {
  try {
    const files = await promisifiedReadDir('./dataset', { encoding: 'utf-8' })
    console.log(files)
    for (let file of files) {
      const fileContent = await promisifiedReadFile(`./dataset/${file}`, { encoding: 'utf-8' })
      console.log(validator(fileContent))
    }
  } catch (err) {
    console.log(err)
  }
}

main()
