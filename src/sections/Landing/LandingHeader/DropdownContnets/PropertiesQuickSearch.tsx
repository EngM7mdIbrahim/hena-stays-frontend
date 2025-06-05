'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GetAllPropertiesQuery, Property } from '@commonTypes'
import { navigationLinks } from '@constants'
import { isNonZeroNumber } from '@guards'
import { useUpdateSearchParams } from '@hooks'
import { Box, Button, Divider } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import { FiSearch } from 'react-icons/fi'

import RangeField, {
  RangeFieldValue
} from '@components/CustomFields/RangeFields'
import SearchField from '@components/CustomFields/SearchField'
import PropertyTypeFilter from '@components/Filters/PropertyTypeFilter'
import { cn } from '@utils'

export interface RentLandingProps {
  type: Property['type']
  className?: string
}

function PropertiesQuickSearch({ className, type }: RentLandingProps) {
  const t = useTranslations()

  const isMobile = useMediaQuery('(max-width: 768px)')

  const { encodeFilters } = useUpdateSearchParams<
    Pick<GetAllPropertiesQuery, 'filter' | 'text'>
  >({ activate: false })
  const [filters, setFilters] = useState<
    Pick<GetAllPropertiesQuery, 'filter' | 'text'>
  >({
    filter: {
      type
    }
  })
  const priceRangeFilters = useMemo<RangeFieldValue>(() => {
    return [
      filters?.filter?.price?.value?.min ?? '',
      filters?.filter?.price?.value?.max ?? ''
    ]
  }, [filters?.filter?.price?.value])
  const router = useRouter()
  return (
    <Box className={cn('relative z-20', className)}>
      {/* Box Content */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(
            `${navigationLinks.properties.allProperties}?${encodeFilters(filters)}`
          )
        }}
        className='rounded-2xl border border-neutral-border bg-gradient-to-br from-default-background to-default-background/35 p-6 backdrop-blur-md'
      >
        <Box className='flex flex-wrap justify-between gap-4'>
          <SearchField
            size='lg'
            className={cn('outline-none', isMobile ? 'w-full' : 'w-[32%]')}
            placeholder={t('homePage.hero.dropdown.placeholders.location')}
            radius='md'
            value={filters.text}
            onChange={(e) => setFilters({ ...filters, text: e.target.value })}
          />
          <Divider
            className={cn(isMobile ? 'w-full' : 'w-[1px]')}
            orientation={isMobile ? 'horizontal' : 'vertical'}
          />
          <PropertyTypeFilter
            inputClassName='bg-default-background'
            className={cn(isMobile ? 'w-full' : 'w-[22%]')}
            value={filters.filter?.subCategory ?? null}
            onChange={(value) =>
              setFilters({
                ...filters,
                filter: {
                  ...filters.filter,
                  ...(value ? { subCategory: value } : {})
                }
              })
            }
            size='lg'
          />
          <Divider
            className={cn(isMobile ? 'w-full' : 'w-[1px]')}
            orientation={isMobile ? 'horizontal' : 'vertical'}
          />
          <RangeField
            wrapperClassName='!bg-default-background'
            isDifferentBackground
            className='flex-1 flex-shrink-0 flex-row overflow-hidden rounded-md border border-neutral-200'
            circleStyle='bg-neutral-100 text-neutral-700'
            inputClassName=' h-full flex items-center justify-center'
            value={priceRangeFilters}
            onChange={(value) => {
              setFilters({
                ...filters,
                filter: {
                  ...filters.filter,
                  price: {
                    value: {
                      min: isNonZeroNumber(value[0])
                        ? Number(value[0])
                        : undefined,
                      max: isNonZeroNumber(value[1])
                        ? Number(value[1])
                        : undefined
                    }
                  }
                }
              })
            }}
          />
          <Button
            variant='gradient'
            gradient={{ from: '#F6A649', to: '#90612B', deg: 270 }}
            type='submit'
            size='lg'
            className='w-full rounded-2xl font-semibold text-white lg:w-auto'
            rightSection={<FiSearch size={20} />}
          >
            {t('homePage.hero.dropdown.search')}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default PropertiesQuickSearch
