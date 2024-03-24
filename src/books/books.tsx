import { AuthorResult } from '@flaminc/books-types'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Pagination } from '@/components/pagination'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Spinner } from '@/components/ui/expansions/spinner'

import { getAuthorQuery } from '../queries/author/get'
import { getBooksQueryPaginated } from '../queries/books/get'
import { PageParameter } from '../types/page-parameter'
// import { cn } from '../utils/cn'

export function Books() {
  const [pageParameter, setPageParameter] = useState<PageParameter>({
    page: 1,
    limit: 10,
  })
  const { data, error } = useQuery(
    getBooksQueryPaginated(pageParameter, {
      retry: false,
      refetchOnWindowFocus: false,
    }),
  )
  const authorsList = useMemo(
    () =>
      data?.items
        .map((book) => book.authors)
        .reduce((accumulator, authors) => {
          for (const author of authors) {
            if (!accumulator.includes(author)) {
              accumulator.push(author)
            }
          }
          return accumulator
        }, []) ?? [],
    [data?.items],
  )

  const authors = useQueries({
    queries: authorsList.map((author) => getAuthorQuery(author)),
  }).reduce<Record<string, AuthorResult>>((accumulator, author) => {
    if (author.data) {
      accumulator[author.data.uri] = author.data
    }
    return accumulator
  }, {})

  if (data) {
    return (
      <div className="flex h-full w-full flex-col gap-4">
        <div className="flex flex-col gap-3">
          {data.items.map((book) => {
            return (
              <Link key={book.uri} to={book.uri}>
                <Card className="transition-opacity hover:opacity-80">
                  <CardContent className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                      {book.title}
                      <div className="flex flex-row gap-2">
                        {book.authors.map((author) => {
                          if (authors[author]) {
                            return (
                              <Badge key={author} className="h-6 px-1 text-xs">
                                {authors[author]?.name}
                              </Badge>
                            )
                          }
                          return null
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span>22/12/2023</span>
                      <span>{book.isbn}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
        <Pagination
          total={data.meta.totalPages ?? Number.POSITIVE_INFINITY}
          page={pageParameter.page}
          onChange={(page) => {
            setPageParameter((previous) => ({ ...previous, page }))
          }}
        />
      </div>
    )
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className="flex h-full w-full flex-row items-center justify-center">
      <Spinner />
    </div>
  )
}
