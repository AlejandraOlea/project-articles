function validateBody(req, res) {
  if (!req.body.title) res.status(400).send('title is missing')
  if (!req.body.url) res.status(400).send('url is missing')
  if (!req.body.keywords) res.status(400).send('keywords is missing')
  if (!Array.isArray(req.body.keywords)) {
    res.status(404).send('keyword is empty')
  }
  if (req.body.keywords.length === 0) {
    res.status(400).send()
  }
  if (!req.body.author) res.status(400).send('author is missing')
  if (!req.body.readMins) res.status(400).send('readMins is missing')
  if (!req.body.source) res.status(400).send('source is missing')
  return true
}

module.exports = validateBody
