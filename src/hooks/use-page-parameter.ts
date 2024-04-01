import { SetStateAction, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { PageParameter } from '@/types/page-parameter'

function getSearchParameterNumber(
  searchParameters: URLSearchParams,
  name: string,
): number | undefined {
  const searchParametersValue = searchParameters.get(name)
  if (searchParametersValue == null) {
    return undefined
  }
  const numberValue = Number.parseInt(searchParametersValue, 10)
  if (Number.isNaN(numberValue) || numberValue < 1) {
    return undefined
  }

  return numberValue
}

export function usePageParameter(
  defaultValue?: PageParameter,
): [PageParameter, (state: SetStateAction<PageParameter>) => void] {
  const { page: defaultPage, limit: defaultLimit } = {
    page: 1,
    limit: 10,
    ...defaultValue,
  }
  const [searchParameters, setSearchParameters] = useSearchParams()

  const pageParameter = useMemo<PageParameter>(() => {
    const page =
      getSearchParameterNumber(searchParameters, 'page') ?? defaultPage
    const limit =
      getSearchParameterNumber(searchParameters, 'limit') ?? defaultLimit

    return { page, limit }
  }, [defaultLimit, defaultPage, searchParameters])
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
