import { AuthorResult } from '@flaminc/books-types'
import axios from 'axios'

export function getAuthor(uri: string): Promise<AuthorResult> {
  return axios
    .get<AuthorResult>(uri, { baseURL: '/api' })
    .then((response) => response.data)
}
