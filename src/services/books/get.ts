import { BooksResult } from '@flaminc/books-types'
import axios from 'axios'

import { PageParameter } from '../../types/page-parameter'

export function getBooks(pageParameter: PageParameter): Promise<BooksResult> {
  return axios
    .get<BooksResult>(`/books`, { baseURL: '/api', params: pageParameter })
    .then((response) => response.data)
}
