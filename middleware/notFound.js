module.exports = (request, response, next) => {
  // response.status(404).json({ error: 'Not Found' }).end()
  response.status(404).end()
}
