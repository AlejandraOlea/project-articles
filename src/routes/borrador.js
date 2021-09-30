const { writeFile } = require('fs')
const { promisify } = require('util')

const promisifiedWriteFile = promisify(writeFile)

const dbWriter = async (item) => {
  await promisifiedWriteFile('./src/db/db.json', JSON.stringify(item), { encoding: 'utf-8' })
  console.log(`Succesfully wrote ${item.length} articles(s) in db.json.`)
}
module.exports = dbWriter

const { readFile } = require('fs')
const { promisify } = require('util')

const promisifiedReadFile = promisify(readFile)

let data

const reader = async (path) => {
  try {
    data = await promisifiedReadFile(path, { encoding: 'utf-8' })
    return JSON.parse(data)
  } catch (err) {
    if (err.code === 'ENOENT') {
      data = []
      return data
    }
    console.log(err)
  }
}

module.exports = reade
