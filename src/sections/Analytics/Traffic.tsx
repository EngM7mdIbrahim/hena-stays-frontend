import React, { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { LOCAL_STORAGE_KEYS, SEARCH_PARAM_KEYS } from '@constants'
import { isSavedCommunityAnalytics } from '@guards'
import { Box, Stack, Text } from '@mantine/core'
import moment from 'moment'
import { useTranslations } from 'next-intl'

import { useGetCommunityAnalytics } from '@hooks/query/analytics/useGetCommunityAnalytics'
import TrafficCard from '@components/Analytics/TrafficCard'
import FullScreenError from '@components/FullScreenError'
import {
  calculatePercentageDifference,
  getFromLocalStorage,
  saveToLocalStorage
} from '@utils'

function Traffic() {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const userId = searchParams.get(SEARCH_PARAM_KEYS.USER_KEY)
  const { data, isLoading, isError, error } = useGetCommunityAnalytics({
    filter: {
      ...(userId && { _id: userId })
    }
  })

  const { visitors, views, saves } = data?.postsInteractions || {}
  const postsInteractions = (visitors || 0) + (views || 0) + (saves || 0)

  const savedCommunityAnalytics = useMemo(() => {
    return getFromLocalStorage(
      LOCAL_STORAGE_KEYS.TRAFFIC,
      isSavedCommunityAnalytics
    )
  }, [
    getFromLocalStorage(LOCAL_STORAGE_KEYS.TRAFFIC, isSavedCommunityAnalytics)
  ])

  const savedTrafficAnalytics = useRef<{
    profileViews: number | null
    postsInteractions: number | null
  }>({ profileViews: null, postsInteractions: null })

  useEffect(() => {
    const lastSavedAt = savedCommunityAnalytics?.savedAt
      ? moment(savedCommunityAnalytics.savedAt)
      : moment().subtract(2, 'day')
    if (
      savedCommunityAnalytics &&
      !savedTrafficAnalytics.current.profileViews &&
      !savedTrafficAnalytics.current.postsInteractions
    ) {
      savedTrafficAnalytics.current.profileViews =
        savedCommunityAnalytics.profileViews
      savedTrafficAnalytics.current.postsInteractions =
        savedCommunityAnalytics.postsInteractions
    }

    return () => {
      if (
        data?.profileViews?.views &&
        postsInteractions &&
        lastSavedAt.isBefore(moment().subtract(1, 'day'))
      ) {
        saveToLocalStorage(LOCAL_STORAGE_KEYS.TRAFFIC, {
          profileViews: data.profileViews?.views,
          postsInteractions,
          savedAt: moment().toISOString()
        })
      }
    }
  }, [savedCommunityAnalytics, data?.profileViews?.views, postsInteractions])

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack className='rounded-lg border border-neutral-200 p-4'>
      <Text className='text-lg font-semibold'>
        {t('userAnalytics.traffic.title')}
      </Text>
      <Box className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <TrafficCard
          title={t('userAnalytics.traffic.profileVisits')}
          value={data?.profileViews?.views || 0}
          isLoading={isLoading}
          percentage={calculatePercentageDifference(
            data?.profileViews?.views,
            savedTrafficAnalytics?.current?.profileViews
          )}
          lastSavedAt={savedCommunityAnalytics?.savedAt}
        />
        <TrafficCard
          isLoading={isLoading}
          title={t('userAnalytics.traffic.postsInteractions')}
          value={postsInteractions}
          percentage={calculatePercentageDifference(
            postsInteractions,
            savedTrafficAnalytics?.current?.postsInteractions
          )}
          lastSavedAt={savedCommunityAnalytics?.savedAt}
        />
      </Box>
    </Stack>
  )
}

export default Traffic
