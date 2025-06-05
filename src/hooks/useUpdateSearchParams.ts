'use client'

import { useCallback, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface useUpdateSearchParamsOptions<T> {
  onFiltersChange?: (filters: T) => void
  activate?: boolean
  scroll?: boolean
}

export function useUpdateSearchParams<T extends object>({
  onFiltersChange,
  activate = true,
  scroll = false
}: useUpdateSearchParamsOptions<T> = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Parse filters from search params with validation
  const parseFiltersFromSearchParams = useCallback(() => {
    try {
      const filtersParam = searchParams?.get('filters')
      if (!filtersParam) return {} as T

      const decoded = decodeURIComponent(filtersParam)
      const parsed = JSON.parse(decoded)

      // Basic object validation - you might want to add more specific validation for T
      if (typeof parsed === 'object') {
        return parsed as T
      }
      return {} as T
    } catch (error) {
      return {} as T
    }
  }, [searchParams])

  const encodeFilters = useCallback((filters: T) => {
    const newURLSearchParams = new URLSearchParams()
    newURLSearchParams.set(
      'filters',
      encodeURIComponent(JSON.stringify(filters))
    )
    return newURLSearchParams.toString()
  }, [])

  // Update URL when filters change
  const updateSearchParams = useCallback(
    (newFilters: T) => {
      const current = new URLSearchParams(
        Array.from(searchParams?.entries() || [])
      )

      // Only update if there are filters
      if (Object.keys(newFilters).length > 0) {
        current.set('filters', encodeURIComponent(JSON.stringify(newFilters)))
      } else {
        current.delete('filters')
      }

      // Construct new URL
      const search = current.toString()
      const query = search ? `?${search}` : ''

      router.push(`${pathname}${query}`, { scroll })
    },
    [pathname, router, searchParams]
  )

  // Initialize and update filters when URL changes
  useEffect(() => {
    const filters = parseFiltersFromSearchParams()
    if (activate) onFiltersChange?.(filters)
  }, [searchParams, parseFiltersFromSearchParams, onFiltersChange, activate])

  return {
    updateSearchParams,
    encodeFilters,
    parseFiltersFromSearchParams
  }
}
