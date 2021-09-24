const fs = require('fs')
const reader = require('./read.js')
const { writeDb, writeInvalid } = require('./writer.js')
const { dbArray, noValid } = require('./arrays')

async function main() {
  try {
    await reader()
    await writeDb(JSON.stringify(dbArray))
    await writeInvalid(JSON.stringify(noValid))
  } catch (err) {
    console.log(err)
  }
}
main()
