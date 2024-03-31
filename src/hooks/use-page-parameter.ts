import { SetStateAction, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { PageParameter, pageParameterSchema } from '@/types/page-parameter'

export function usePageParameter(): [
  PageParameter,
  (state: SetStateAction<PageParameter>) => void,
] {
  const [searchParameters, setSearchParameters] = useSearchParams()

  const pageParameter = useMemo<PageParameter>(() => {
    const searchParametersPage = searchParameters.get('page')
    const searchParametersLimit = searchParameters.get('limit')

    return pageParameterSchema.parse({
      page: searchParametersPage,
      limit: searchParametersLimit,
    })
  }, [searchParameters])
  const setPageParameter = useCallback(
    (state: SetStateAction<PageParameter>) => {
      const newState =
        typeof state === 'function' ? state(pageParameter) : state
      setSearchParameters({
        page: newState.page.toString(),
        limit: newState.limit.toString(),
      })
    },
    [pageParameter, setSearchParameters],
  )

  return [pageParameter, setPageParameter]
}
