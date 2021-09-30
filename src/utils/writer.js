const { writeFile } = require('fs')
const { promisify } = require('util')

const promisifiedWriteFile = promisify(writeFile)

const dbWriter = async (item) => {
  await promisifiedWriteFile('./src/db/db.json', JSON.stringify(item), { encoding: 'utf-8' })
  console.log(`Succesfully wrote ${item.length} articles(s) in db.json.`)
}
module.exports = dbWriter
