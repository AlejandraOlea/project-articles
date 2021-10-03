// const fs = require('fs')
// const { promisify } = require('util')
// const { readdir, readFile } = require('fs')
// const promisifiedReadDir = promisify(readdir)
// const promisifiedReadFile = promisify(readFile)
// const validator = require('./validator.js')

// async function reader() {
//   try {
//     const files = await promisifiedReadDir('./dataset', { encoding: 'utf-8' })
//     console.log(files)
//     for (let file of files) {
//       const fileContent = await promisifiedReadFile(`./dataset/${file}`, { encoding: 'utf-8' })
//       validator(fileContent)
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

// module.exports = reader
