import { SEARCH_PARAM_KEYS } from '@constants'

export const useLinkConstructor = () => {
  const constructLink = (
    href: string,
    query?: Partial<
      Record<(typeof SEARCH_PARAM_KEYS)[keyof typeof SEARCH_PARAM_KEYS], string>
    >
  ) => {
    const queryString = query
      ? `?${Object.entries(query)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&')}`
      : ''

    return `${href}${queryString}`
  }

  return { constructLink }
}
