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
  readonly className?: string
  readonly total: number
  readonly page: number
  readonly onChange: (page: number) => void
}

// {/* <Pagination
//   className="self-end"
//   total={data.meta.totalPages ?? Number.POSITIVE_INFINITY}
//   page={pageParameter.page}
//   onChange={(page) => {
//     setPageParameter((previous) => ({ ...previous, page }))
//   }}
//   showControls
//   showShadow
// /> */}

export function Pagination({
  // className,
  total,
  page: inputPage,
  onChange,
}: PaginationProps) {
  const page = inputPage <= 0 ? 1 : inputPage > total ? total : inputPage

  return (
    <PaginationShad>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem className="">
            <PaginationPrevious onClick={() => onChange(page - 1)} />
          </PaginationItem>
        )}
        {page > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => onChange(1)}>1</PaginationLink>
          </PaginationItem>
        )}
        {page > 3 && (
          <PaginationItem>
            <PaginationLink onClick={() => onChange(2)}>2</PaginationLink>
          </PaginationItem>
        )}
        {page > 4 && (
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
        {page < total - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page < total - 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => onChange(total - 1)}>
              {total - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < total - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => onChange(total)}>
              {total}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < total && (
          <PaginationItem>
            <PaginationNext onClick={() => onChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationShad>
  )
}
