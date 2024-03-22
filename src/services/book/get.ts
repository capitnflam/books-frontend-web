import { BookResult } from '@flaminc/books-types'
import axios from 'axios'

export function getBook(uri: string): Promise<BookResult> {
  return axios
    .get<BookResult>(uri, { baseURL: '/api' })
    .then((response) => response.data)
}
