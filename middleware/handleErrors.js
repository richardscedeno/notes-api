module.exports = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'Id no está bien usada' })
  } else {
    response.status(500).end()
  }
}
