import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type AppPaginationProps = {
  currentPage: number
  limit: number
  totalRecords: number
  onPageChange: (page: number) => void
}

type PageItem = number | 'start-ellipsis' | 'end-ellipsis'

const getPageItems = (currentPage: number, totalPages: number): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages: PageItem[] = [1]
  const startPage = Math.max(2, currentPage - 1)
  const endPage = Math.min(totalPages - 1, currentPage + 1)

  if (startPage > 2) {
    pages.push('start-ellipsis')
  } else {
    for (let page = 2; page < startPage; page += 1) {
      pages.push(page)
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page)
  }

  if (endPage < totalPages - 1) {
    pages.push('end-ellipsis')
  } else {
    for (let page = endPage + 1; page < totalPages; page += 1) {
      pages.push(page)
    }
  }

  pages.push(totalPages)

  return pages
}

export default function AppPagination({
  currentPage,
  limit,
  totalRecords,
  onPageChange,
}: AppPaginationProps) {
  const totalPages = Math.ceil(totalRecords / limit)
  const pageItems = getPageItems(currentPage, totalPages)
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages)
    onPageChange(nextPage)
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={isFirstPage}
            className={isFirstPage ? 'pointer-events-none opacity-50' : ''}
            onClick={(event) => {
              event.preventDefault()
              handlePageChange(currentPage - 1)
            }}
          />
        </PaginationItem>

        {pageItems.map((pageItem) => {
          if (typeof pageItem !== 'number') {
            return (
              <PaginationItem key={pageItem}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={pageItem}>
              <PaginationLink
                href="#"
                isActive={pageItem === currentPage}
                onClick={(event) => {
                  event.preventDefault()
                  handlePageChange(pageItem)
                }}
              >
                {pageItem}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={isLastPage}
            className={isLastPage ? 'pointer-events-none opacity-50' : ''}
            onClick={(event) => {
              event.preventDefault()
              handlePageChange(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  )
}
