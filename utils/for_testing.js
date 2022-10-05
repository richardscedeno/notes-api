const palindrome = (string) => {
  if (typeof string === 'undefined') return

  return string
    .split('')
    .reverse()
    .join('')
}

const average = array => {
  if (array.length === 0) return 0

  let suma = 0
  array.forEach(num => {
    suma += num
  })
  return suma / array.length
}

module.exports = { palindrome, average }
