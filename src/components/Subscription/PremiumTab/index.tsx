import React, { Dispatch, SetStateAction } from 'react'
import { GetAllPropertiesQuery, GetAllPropertiesResponse } from '@commonTypes'
import { Box, Button, Group, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiPlus } from 'react-icons/bi'

import AppPagination from '@components/AppPagination'
import EmptyWrapper from '@components/EmptyWrapper'
import ItemsWrapper from '@components/ItemWrapper'
import PropertyCard, { PropertyCardSkeleton } from '@components/PropertyCard'

export interface PremiumTabProps {
  data: GetAllPropertiesResponse | undefined
  isLoading: boolean
  description: string
  onAddFeaturedProperty: () => void
  page: GetAllPropertiesQuery['page']
  setPage: Dispatch<SetStateAction<GetAllPropertiesQuery['page']>>
}

function PremiumTab({
  data,
  isLoading,
  description,
  onAddFeaturedProperty,
  page,
  setPage
}: PremiumTabProps) {
  const t = useTranslations()
  return (
    <Box className='space-y-4'>
      <Text className='border-b pb-4 text-base md:text-[17px]'>
        {description}
      </Text>
      <Group className='items-center justify-between gap-2'>
        <Text className='font-semibold'>
          {t('premium.addFeaturedProperty.activeFeaturedProperties')}
        </Text>
        <Button
          radius='md'
          size='md'
          leftSection={<BiPlus size={23} />}
          variant='transparent'
          className='border border-primary font-bold text-neutral-700'
          onClick={onAddFeaturedProperty}
        >
          {t('premium.addFeaturedProperty.addFeaturedProperty')}
        </Button>
      </Group>
      {data && (
        <ItemsWrapper
          loading={isLoading}
          className='grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'
          LoadingComponent={<PropertyCardSkeleton />}
          EmptyComponent={
            <EmptyWrapper
              description={t('shared.emptyDescription', {
                itemName: t('properties.title')
              })}
            />
          }
        >
          {data?.items?.map((property) => (
            <PropertyCard
              key={property._id}
              layout='vertical'
              property={property}
            />
          ))}
        </ItemsWrapper>
      )}

      <Box className='mt-8 flex items-center justify-center'>
        <AppPagination
          value={page ? +page : 1}
          onChange={(value) => setPage(String(value))}
          total={data?.totalPages ?? 0}
        />
      </Box>
    </Box>
  )
}

export default PremiumTab
