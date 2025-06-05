'use client'

import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { GetAllProjectsQuery, SortOrder } from '@commonTypes'
import { defaultLimitOptions, getDefaultSortOptions } from '@constants'
import { isNonZeroNumber } from '@guards'
import { Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'

import RangeField, {
  RangeFieldValue
} from '@components/CustomFields/RangeFields'
import SearchField from '@components/CustomFields/SearchField'
import LimitButton from '@components/LimitButton'
import SortButton from '@components/SortButton'
import { cn } from '@utils'

export interface FiltersProps {
  filters: Pick<GetAllProjectsQuery, 'filter' | 'text'>
  onFiltersChange: (
    filters: Pick<GetAllProjectsQuery, 'filter' | 'text'>
  ) => void
  sort: Record<string, SortOrder> | null | undefined
  setSort: Dispatch<
    SetStateAction<Record<string, SortOrder> | null | undefined>
  >
  limit: string | undefined
  setLimit: Dispatch<SetStateAction<string>>
}

function ProjectFilters({
  filters,
  onFiltersChange,
  sort,
  setSort,
  limit,
  setLimit
}: FiltersProps) {
  const t = useTranslations()
  const priceRangeFilters = useMemo<RangeFieldValue>(() => {
    return [
      filters?.filter?.startingPrice?.min ?? '',
      filters?.filter?.startingPrice?.max ?? ''
    ]
  }, [filters?.filter?.startingPrice])
  return (
    <Flex className='flex-col-reverse items-start justify-between gap-4 rounded-full md:flex-col'>
      <Flex className='w-full gap-2'>
        {/* Search Input */}

        <SearchField
          classNames={{
            input: cn(
              'py-0 w-full border border-neutral-200 bg-default-background'
            )
          }}
          size='lg'
          className='flex-1 bg-transparent outline-none'
          placeholder={t('shared.placeholders.search')}
          radius='md'
          value={filters.text}
          onChange={(e) =>
            onFiltersChange({ ...filters, text: e.target.value })
          }
        />
        {/* Price Range */}
        <RangeField
          className='hidden flex-1 flex-shrink-0 flex-row overflow-hidden rounded-md border border-neutral-200 md:flex'
          wrapperClassName='!bg-default-background'
          circleStyle='bg-neutral-100 text-neutral-700'
          inputClassName=' h-full flex items-center'
          isDifferentBackground
          value={priceRangeFilters}
          onChange={(value) => {
            onFiltersChange({
              ...filters,
              filter: {
                ...filters.filter,
                startingPrice: {
                  min: isNonZeroNumber(value[0]) ? Number(value[0]) : undefined,
                  max: isNonZeroNumber(value[1]) ? Number(value[1]) : undefined
                }
              }
            })
          }}
        />
      </Flex>
      <Flex className='gap-2'>
        <SortButton
          className='max-w-full'
          radius='xl'
          size='md'
          value={sort ? JSON.stringify(sort) : null}
          onChange={(value) => {
            setSort(value ? JSON.parse(value) : null)
          }}
          data={getDefaultSortOptions(t)}
        />
        <LimitButton
          className='max-w-full'
          size='md'
          radius='xl'
          value={limit}
          onChange={(value) => {
            setLimit(value ?? defaultLimitOptions[0].value)
          }}
          data={defaultLimitOptions}
        />
      </Flex>
    </Flex>
  )
}

export default ProjectFilters
