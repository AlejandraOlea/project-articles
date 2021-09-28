// const fs = require('fs')
// const { readdir, readFile } = require('fs')
// const { promisify } = require('util')
// const yup = require('yup')
// const promisifiedReadDir = promisify(readdir)
// const promisifiedReadFile = promisify(readFile)
// const promisifiedWriteFile = promisify(fs.writeFile)

// let dbArray = []
// let noValid = []
// const validator = (data) => {
//   const parseData = JSON.parse(data)
//   console.log(parseData)

//   let schema = yup.object().shape({
//     id: yup.string().length(36).required(),
//     title: yup.string().min(1).max(255).required(),
//     url: yup.string().required(),
//     keywords: yup.array().min(1).max(3).required(),
//     modifiedAt: yup.date().required(),
//     publishedAt: yup.date(),
//     author: yup.string().max(100).required(),
//     readMins: yup.number().min(1).max(20).required(),
//     source: yup.string().required(),
//   })

//   // check validity
//   schema
//     .validate(parseData)
//     .then(function (valid) {
//       //   console.log('===VALID====', valid) // => true
//       dbArray.push(parseData)
//       console.log('Array', dbArray)
//     })
//     .catch(function (err) {
//       console.log('===NO VALID====', err)
//       if (err) {
//         noValid.push(parseData)
//         console.log('Array', noValid)
//       }
//     })
// }

// const writeDb = async (item) => {
//   fs.writeFile('./db.json', item, { encoding: 'utf-8' }, (err, data) => {
//     if (err) {
//       console.log(err)
//     }
//     if (data) {
//       console.log('succes')
//     }
//   })
// }
// const writeInvalid = async (item) => {
//   fs.writeFile('./invalid.json', item, { encoding: 'utf-8' }, (err, data) => {
//     if (err) {
//       console.log(err)
//     }
//     if (data) {
//       console.log('SUCCES')
//     }
//   })
// }

// async function main() {
//   try {
//     const files = await promisifiedReadDir('./dataset', { encoding: 'utf-8' })
//     // console.log(files)
//     for (let file of files) {
//       const fileContent = await promisifiedReadFile(`./dataset/${file}`, { encoding: 'utf-8' })
//       //   console.log(validator(fileContent))

//       const isValid = await validator(fileContent)
//     }
//     writeDb(JSON.stringify(dbArray))
//     writeInvalid(JSON.stringify(noValid))
//   } catch (err) {
//     console.log(err)
//   }
// }

// main()
