import { plural } from 'pluralize'

/**
 * for pathname matching
 * str starts with word (plural or singular)
 */
export function startsWithPlural(string_: string, word: string) {
  const splitWord = word.split('/')
  const splitString = string_.split('/')

  if (splitWord.length >= splitString.length) {
    return false
  }

  for (const [it, element] of splitWord.entries()) {
    const pluralWord = plural(element)
    const pluralString = plural(splitString[it] ?? '')

    if (pluralWord !== pluralString) {
      return false
    }
  }

  return true
}
