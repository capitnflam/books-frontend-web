import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationShad,
} from '@/components/ui/pagination'

interface PaginationProps {
  readonly total: number
  readonly page: number
  readonly onChange: (page: number) => void
  readonly shownAtStartCount?: number
  readonly shownAtEndCount?: number
}

export function Pagination({
  total,
  page: inputPage,
  onChange,
  shownAtStartCount = 2,
  shownAtEndCount = 2,
}: PaginationProps) {
  const page = inputPage <= 0 ? 1 : inputPage > total ? total : inputPage
  const shownAtStart =
    shownAtStartCount > 0 ? Math.min(shownAtStartCount, total) : 1
  const shownAtEnd = shownAtEndCount > 0 ? Math.min(shownAtEndCount, total) : 1

  return (
    <PaginationShad>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => onChange(page - 1)} />
          </PaginationItem>
        )}
        {Array.from({ length: shownAtStart }, (_, index) => index + 1).map(
          (index) => {
            if (page <= index + 1) {
              return
            }
            return (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => onChange(index)}>
                  {index}
                </PaginationLink>
              </PaginationItem>
            )
          },
        )}
        {page > shownAtStart + 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => onChange(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive onClick={() => onChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
        {page < total && (
          <PaginationItem>
            <PaginationLink onClick={() => onChange(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < total - (shownAtEnd + 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Array.from(
          { length: shownAtEnd },
          (_, index) => total - shownAtEnd + index + 1,
        ).map((index) => {
          if (page >= index - 1) {
            return
          }
          return (
            <PaginationItem key={index}>
              <PaginationLink onClick={() => onChange(index)}>
                {index}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {page < total && (
          <PaginationItem>
            <PaginationNext onClick={() => onChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationShad>
  )
}
