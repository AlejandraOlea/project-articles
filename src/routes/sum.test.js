const sum = require('./sum')

const mock = () => {}

describe('math libray', () => {
  test('add 1 + 2 to equal 3', () => {
    const result = 1 + 2
    expect(sum(1, 2, mock)).toBe(result)
    expect(typeof sum(1, 2)).toBe('number')
  })
  test('add 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
  test('add 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
