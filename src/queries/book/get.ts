import { BookResult } from '@flaminc/books-types'
import { useQuery } from '@tanstack/react-query'

import { getBook } from '../../services/book/get'

export function getBookQuery(
  uri: string,
  options: Omit<
    Parameters<typeof useQuery<BookResult>>[0],
    'queryKey' | 'queryFn'
  > = {},
) {
  return { ...options, queryKey: ['book', uri], queryFn: () => getBook(uri) }
}
