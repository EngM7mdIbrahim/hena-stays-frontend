import { InfiniteData } from '@tanstack/react-query'

export function isInfiniteData<T>(data: unknown): data is InfiniteData<T> {
  return !!data && typeof data === 'object' && 'pages' in data
}
