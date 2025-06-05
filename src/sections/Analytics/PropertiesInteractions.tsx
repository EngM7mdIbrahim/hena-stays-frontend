import React from 'react'
import { Property } from '@commonTypes'
import { useInteractionsList } from '@hooks'
import { Box, Flex, ScrollArea, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PropertyAdCard, {
  PropertyAdCardLoading
} from '@components/Analytics/PropertyAdCard'
import AppPagination from '@components/AppPagination'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'

function PropertiesInteractions() {
  const t = useTranslations()
  const { interactions, isLoading, isError, error, page, setPage, data } =
    useInteractionsList()

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack className='rounded-lg border border-neutral-200 p-4'>
      <Text className='text-lg font-semibold'>
        {t('userAnalytics.topPropertyAds')}
      </Text>
      <ScrollArea offsetScrollbars className='item h-[500px]'>
        <ItemsWrapper
          loading={isLoading}
          EmptyComponent={
            <EmptyWrapper
              description={t('shared.emptyDescription', {
                itemName: t('properties.title')
              })}
            />
          }
          LoadingComponent={<PropertyAdCardLoading />}
        >
          {interactions?.map((item, index) => (
            <Flex className='mb-4 items-center gap-2 last:mb-0' key={item._id}>
              <Text component='span' className='text-lg text-cyan-600'>
                {index + 1}
              </Text>
              <Box className='flex-1'>
                <PropertyAdCard
                  interactions={{ ...item }}
                  property={item?.property as unknown as Property}
                />
              </Box>
            </Flex>
          ))}
        </ItemsWrapper>
        <Box className='flex justify-center py-2'>
          <AppPagination
            total={data?.totalPages ?? 0}
            value={data?.page || +page}
            onChange={(value) => setPage(String(value))}
          />
        </Box>
      </ScrollArea>
    </Stack>
  )
}

export default PropertiesInteractions
