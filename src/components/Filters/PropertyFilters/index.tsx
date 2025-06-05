import React, { useMemo, useState } from 'react'
import {
  GetAllPropertiesQuery,
  SaleTypeEnum,
  SaleTypeEnumType
} from '@commonTypes'
import { isNonZeroNumber } from '@guards'
import { useSearchPlaces } from '@hooks'
import { Box, Button, Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiChevronDown } from 'react-icons/bi'
import { FaLocationDot } from 'react-icons/fa6'

import { DynamicAutoComplete } from '@components/CustomFields/DynamicAutoComplete'
import RangeField, {
  RangeFieldValue
} from '@components/CustomFields/RangeFields'
import SelectField from '@components/CustomFields/SelectField'
import PropertyTypeFilter from '@components/Filters/PropertyTypeFilter'
import AppModal from '@components/Modals/AppModal'
import { capitalizeFirstLetter } from '@utils'

import MoreFilters from './MoreFilters'

export interface FiltersProps {
  filters: Pick<GetAllPropertiesQuery, 'filter' | 'text' | 'startLocation'>
  onFiltersChange: (
    filters: Pick<GetAllPropertiesQuery, 'filter' | 'text' | 'startLocation'>
  ) => void
}

function Filters({ filters, onFiltersChange }: FiltersProps) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const { mutateAsync: searchPlaces } = useSearchPlaces()

  const priceRangeFilters = useMemo<RangeFieldValue>(() => {
    return [
      filters?.filter?.price?.value?.min ?? '',
      filters?.filter?.price?.value?.max ?? ''
    ]
  }, [filters?.filter?.price?.value])

  return (
    <Flex className='flex-wrap items-stretch justify-between gap-4 rounded-full'>
      {/* Search Input */}
      <Box className='w-full flex-shrink-0 lg:w-[30%]'>
        <DynamicAutoComplete
          classNames={{
            input: 'py-6 w-full bg-default-background border border-neutral-200'
          }}
          size='lg'
          radius='md'
          leftSection={<FaLocationDot size={20} />}
          placeholder={
            filters.startLocation?.city ??
            t('shared.placeholders.searchByLocation')
          }
          data={async (text) => {
            if (text.trim().length >= 3) {
              const data = await searchPlaces({ text })
              return data.places.map((place) => ({
                value: place,
                label: place.name
              }))
            }
            return []
          }}
          onOptionSelect={(location) => {
            if (location) {
              onFiltersChange({
                ...filters,
                startLocation: {
                  lat: location.coordinates[0],
                  lng: location.coordinates[1]
                }
              })
            } else {
              onFiltersChange({
                ...filters,
                startLocation: undefined
              })
            }
          }}
        />
      </Box>

      {/* Sale Type */}
      <Box className='flex-1 flex-shrink-0 lg:w-[10%]'>
        <SelectField
          size='lg'
          classNames={{
            input: 'border border-neutral-200 rounded-md bg-default-background'
          }}
          placeholder={t('shared.placeholders.type')}
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
        className='hidden flex-1 flex-shrink-0 flex-row overflow-hidden rounded-md border border-neutral-200 md:flex'
        circleStyle='bg-neutral-100 text-neutral-700'
        inputClassName=' h-full flex items-center justify-center '
        value={priceRangeFilters}
        onChange={(value) => {
          onFiltersChange({
            ...filters,
            filter: {
              ...filters.filter,
              price: {
                value: {
                  min: isNonZeroNumber(value[0]) ? Number(value[0]) : undefined,
                  max: isNonZeroNumber(value[1]) ? Number(value[1]) : undefined
                }
              }
            }
          })
        }}
      />

      {/* More Button */}
      <AppModal
        open={open}
        size='lg'
        setOpen={setOpen}
        title={t('shared.moreFilters')}
        trigger={
          <Button
            size='lg'
            className='flex flex-shrink-0 items-center justify-center gap-3 rounded-md border border-neutral-200 bg-default-background p-3 font-normal text-neutral-500 active:border-primary lg:w-[8%]'
          >
            {t('properties.buttons.more')} <BiChevronDown />
          </Button>
        }
      >
        <MoreFilters
          filters={filters}
          onFiltersChange={(newMoreFilters) => {
            onFiltersChange({
              ...filters,
              ...newMoreFilters
            })
          }}
          onReset={() => {
            onFiltersChange({})
          }}
          onClose={() => setOpen(false)}
        />
      </AppModal>
    </Flex>
  )
}

export default Filters
