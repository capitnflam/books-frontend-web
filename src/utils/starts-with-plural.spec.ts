import { startsWithPlural } from './starts-with-plural'

const path = '/books/123'

describe('startsWithPlural', () => {
  it('should return true if the first pathname starts with the second one (singular)', () => {
    const result = startsWithPlural(path, '/book')
    expect(result).toBe(true)
  })

  it('should return true if the first pathname starts with the second one (plural)', () => {
    const result = startsWithPlural(path, '/books')
    expect(result).toBe(true)
  })

  it('should return false if the first pathname does not start with the second one (singular)', () => {
    const result = startsWithPlural(path, '/author')
    expect(result).toBe(false)
  })

  it('should return false if the first pathname does not start with the second one (plural)', () => {
    const result = startsWithPlural(path, '/authors')
    expect(result).toBe(false)
  })

  it('should return true if the first pathname starts with the second one (singular vs plural)', () => {
    const result = startsWithPlural(path, '/books')
    expect(result).toBe(true)
  })

  it('should return true if the first pathname starts with the second one (plural vs singular)', () => {
    const result = startsWithPlural(path, '/book')
    expect(result).toBe(true)
  })

  it('should return false if the first pathname contains less parts then the second one', () => {
    const result = startsWithPlural(path, '/a/b/c/d/e/f')
    expect(result).toBe(false)
  })
})
