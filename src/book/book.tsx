import { useQueries, useQuery } from '@tanstack/react-query'
import { Link as LinkIcon, RefreshCcw as RefreshCcwIcon } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Markdown } from '../components/markdown'
import { getAuthorQuery } from '../queries/author/get'
import { getBookQuery } from '../queries/book/get'

import { BookCard } from './book-card'
import { BookEdit } from './book-edit'
import { BookLoading } from './book-loading'

type ParametersKey = 'id'

export function Book() {
  const { id } = useParams<ParametersKey>()
  const getQuery = getBookQuery(`/book/${id}`, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: id !== undefined,
  })
  const { data: book, error, isRefetching, refetch } = useQuery(getQuery)
  const refreshOnDemand = useCallback(async () => {
    await refetch()
  }, [refetch])

  const authors = useQueries({
    queries: book?.authors.map((author) => getAuthorQuery(author)) ?? [],
  })

  const cover = useMemo(() => {
    if (book) {
      if (book?.coverURL) {
        return <img alt={book.title} src={book.coverURL} />
      }
      return (
        <span className="h-auto w-auto whitespace-nowrap bg-yellow-100 text-black">
          No cover
        </span>
      )
    }
    return null
  }, [book])

  if (id === undefined) {
    return <BookCard header="Error">No book id</BookCard>
  }

  if (book) {
    return (
      <BookCard
        header={
          <>
            <div className="flex max-h-[600px] min-h-[150px] min-w-[100px] max-w-[400px] items-center justify-center">
              {cover}
            </div>
            <div className="flex w-full flex-col items-center">
              <Link className="flex flex-row gap-2" to={book?.uri}>
                <span className="text-3xl font-bold">{book?.title}</span>
                <LinkIcon className="m-auto h-4" />
              </Link>
              <div className="m-2 flex w-full flex-wrap justify-center gap-2">
                {authors.map((author, index) =>
                  author.data ? (
                    <Link
                      key={`${author.data?.uri}_${index}`}
                      to={author.data?.uri}
                    >
                      <Badge>{author.data?.name}</Badge>
                    </Link>
                  ) : (
                    <Badge key={index}>
                      <Skeleton className="h-4 w-24 rounded-lg" />
                    </Badge>
                  ),
                )}
              </div>
            </div>
            <div className="absolute right-0 top-0 mr-4 flex flex-row gap-4">
              <BookEdit id={id} />
              <Button variant="link" className="m-0 p-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <RefreshCcwIcon
                      className={`h-6 w-6 ${
                        isRefetching ? 'animate-spin' : ''
                      } hover:animate-spin hover:cursor-pointer`}
                      onClick={refreshOnDemand}
                    />
                  </TooltipTrigger>
                  <TooltipContent>Refresh</TooltipContent>
                </Tooltip>
              </Button>
            </div>
          </>
        }
      >
        <Markdown className="mx-auto max-w-[80%]">{book.synopsis}</Markdown>
      </BookCard>
    )
  }

  if (error) {
    return <BookCard header="Error">{error.message}</BookCard>
  }

  return <BookLoading id={id ?? '0'} />
}
