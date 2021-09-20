const { readdir, readFile } = require('fs')
const { promisify } = require('util')

const validator = (data) => {
  //   const keys = Object.keys()
  //   const values = Object.values()
  //   const entries = Object.entries()
  return true
}

// const result = fs.readdirSync('./dataset', { encoding: 'utf-8' })
// console.log('result', result)

const promisifiedReadDir = promisify(readdir)
const promisifiedReadFile = promisify(readFile)

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

// fs.readdir('./dataset', { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     console.log('err', error)
//   }
//   console.log('data', data)

//   for (let file of data) {
//     fs.readFile(`./dataset/${file}`, { encoding: 'utf-8' }, (err, data) => {
//       if (err) {
//         console.log(err)
//       }
//       console.log(data)
//     })
//   }
// })
