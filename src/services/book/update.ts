import { BookRequest, BookResult } from '@flaminc/books-types'
import axios from 'axios'

export function updateBook(book: BookRequest): Promise<BookResult> {
  return axios
    .put<BookResult>(book.uri, book, { baseURL: '/api' })
    .then((response) => response.data)
}
