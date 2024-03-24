import { BooksResult } from '@flaminc/books-types'
import {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'

import { getBooks } from '@/services/books/get'
import { PageParameter } from '@/types/page-parameter'

type UseInfiniteQueryParameters = Parameters<
  typeof useInfiniteQuery<
    BooksResult,
    Error,
    InfiniteData<BooksResult, PageParameter>,
    QueryKey,
    PageParameter
  >
>

export function getBooksQueryPaginated(
  pageParameter: PageParameter,
  options: Omit<
    Parameters<typeof useQuery<BooksResult>>[0],
    'queryKey' | 'queryFn'
  > = {},
) {
  return {
    placeHolderData: keepPreviousData<BooksResult>,
    ...options,
    queryKey: ['books', pageParameter],
    queryFn: () => getBooks(pageParameter),
  }
}

export function getBooksQueryInfinite(
  options: Omit<
    UseInfiniteQueryParameters[0],
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
  > &
    Partial<
      Pick<
        UseInfiniteQueryParameters[0],
        'getNextPageParam' | 'initialPageParam'
      >
    >,
) {
  return {
    initialPageParam: { page: 1, limit: 10 },
    getNextPageParam: (lastPage: BooksResult) => {
      if (
        !(
          (lastPage.meta.totalPages ?? Number.POSITIVE_INFINITY) >
            lastPage.meta.currentPage && lastPage.meta.itemCount > 0
        )
      ) {
        return
      }
      return {
        page: lastPage.meta.currentPage + 1,
        limit: lastPage.meta.itemsPerPage,
      }
    },
    ...options,
    queryKey: ['books'],
    queryFn: (context: QueryFunctionContext<QueryKey, PageParameter>) =>
      getBooks(context.pageParam),
  }
}
