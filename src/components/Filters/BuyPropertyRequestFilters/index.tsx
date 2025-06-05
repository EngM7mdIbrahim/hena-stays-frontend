import React, { useMemo } from 'react'
import {
  GetAllRequestBuyPropertyQuery,
  SaleTypeEnum,
  SaleTypeEnumType
} from '@commonTypes'
import { isNonZeroNumber } from '@guards'
import { Box, Flex, UnstyledButton } from '@mantine/core'
import { useTranslations } from 'next-intl'

import RangeField, {
  RangeFieldValue
} from '@components/CustomFields/RangeFields'
import SelectField from '@components/CustomFields/SelectField'
import PropertyTypeFilter from '@components/Filters/PropertyTypeFilter'
import { capitalizeFirstLetter } from '@utils'

export interface FiltersProps {
  filters: Pick<GetAllRequestBuyPropertyQuery, 'filter'>
  onFiltersChange: (
    filters: Pick<GetAllRequestBuyPropertyQuery, 'filter'>
  ) => void
}

function BuyPropertyRequestFilters({ filters, onFiltersChange }: FiltersProps) {
  const t = useTranslations()
  const priceRangeFilters = useMemo<RangeFieldValue>(() => {
    return [
      filters?.filter?.price?.from?.min ?? '',
      filters?.filter?.price?.to?.max ?? ''
    ]
  }, [filters?.filter?.price])

  return (
    <Flex className='flex-wrap items-stretch justify-between gap-4 rounded-full'>
      {/* Sale Type */}
      <Box className='flex-1 flex-shrink-0 lg:w-[10%]'>
        <SelectField
          size='lg'
          classNames={{
            input: 'border border-neutral-200 bg-default-background  rounded-md'
          }}
          placeholder={t('shared.fields.propertyType.label')}
          data={Object.values(SaleTypeEnum).map((type) => ({
            value: type,
            label: capitalizeFirstLetter(type)
          }))}
          value={filters.filter?.type ?? null}
          onChange={(value) =>
            onFiltersChange({
              ...filters,
              filter: {
                ...filters.filter,
                type: value as SaleTypeEnumType
              }
            })
          }
        />
      </Box>

      {/* Property Type */}
      <Box className='flex-1 flex-shrink-0 lg:w-[16%]'>
        <PropertyTypeFilter
          value={filters.filter?.subCategory ?? null}
          onChange={(value) =>
            onFiltersChange({
              ...filters,
              filter: {
                ...filters.filter,
                ...(value ? { subCategory: value } : {})
              }
            })
          }
          size='lg'
          className='w-full'
        />
      </Box>

      {/* Price Range */}
      <RangeField
        isDifferentBackground
        wrapperClassName='!bg-default-background'
        className='hidden flex-1 flex-shrink-0 flex-row overflow-hidden rounded-md border border-neutral-200 bg-white dark:bg-mtn-dark-6 md:flex'
        circleStyle='bg-neutral-100 text-neutral-700 '
        inputClassName=' h-full flex items-center  '
        value={priceRangeFilters}
        onChange={(value) => {
          onFiltersChange({
            ...filters,
            filter: {
              ...filters.filter,
              price: {
                from: {
                  min: isNonZeroNumber(value[0]) ? Number(value[0]) : undefined
                },
                to: {
                  max: isNonZeroNumber(value[1]) ? Number(value[1]) : undefined
                }
              }
            }
          })
        }}
      />
      {/* Clear Filters */}
      <UnstyledButton className='border-2' onClick={() => onFiltersChange({})}>
        {t('shared.buttons.clear')}
      </UnstyledButton>
    </Flex>
  )
}

export default BuyPropertyRequestFilters
