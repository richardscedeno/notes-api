const ERROR_HANDLERS = {
  CastError: res => res.status(400).send({ error: 'id used is malformed' }),
  ValidationErrors: (res, error) => res.status(409).send({ error: error.message }),
  JsonWebTokenError: res => res.status(401).json({ error: 'token missing or invalid' }),
  TokenExpirerError: res => res.status(401).json({ error: 'token expired' }),
  defaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) => {
  console.error(error.name)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)
}
