const { palindrome } = require('../utils/for_testing')

test('palindrome od chards', () => {
  const result = palindrome('chardsdev')

  expect(result).toBe('vedsdrahc')
})

test('palindrome of undefided', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})
