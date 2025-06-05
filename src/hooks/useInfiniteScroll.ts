import { DependencyList, useEffect } from 'react'

export const useInfiniteScroll = (
  fetcher: () => void,
  hasNextPage: boolean,
  dependency: DependencyList
) => {
  useEffect(() => {
    if (hasNextPage && dependency) {
      fetcher()
    }
  }, [...dependency, hasNextPage, fetcher])
}
