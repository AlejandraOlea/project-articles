const fs = require('fs')
const { promisify } = require('util')
const readerPromise = promisify(fs.readFile)

const reader = async (path) => {
  try {
    const data = await readerPromise(path, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(err.code)
      const data = []
      console.log(data)
      return data
    } else {
      console.log(err)
    }
  }
}

module.exports = reader
