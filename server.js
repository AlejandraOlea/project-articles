const http = require('http')
const fs = require('fs')
const url = require('url')
const reader = require('./reader.js')

const server = http.createServer(async (req, res) => {
  //set  header content type
  res.setHeader('Content-type', 'application/json')
  let data = await reader('./db.json')
  let queryString = url.parse(req.url, true).query
  console.log(queryString)
  switch (true) {
    case req.url === '/articles':
      try {
        res.write(data)
        res.end()
        res.stausCode = 200
        break
      } catch (err) {
        console.log(err)
      }
    case typeof queryString.id === 'string':
      const founded = JSON.parse(data).find((e) => e.id === queryString.id)
      console.log('founded es', founded)
      if (founded === undefined) {
        res.write('Not found')
        res.stausCode = 404
        res.end()
        break
      }
      res.write(JSON.stringify(founded))
      res.end()
      break
    default:
      console.log(url.parse(req.url, true).query.id)
      res.write('Prompt url')
      res.end()
      break
  }
})

server.listen(8080, 'localhost', () => {
  console.log('====Listening for requests in port 8080====')
})
