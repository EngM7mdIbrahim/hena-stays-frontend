'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import {
  InteractionsPropertiesAnalytics,
  PropertiesAnalytics
} from '@commonTypes'
import {
  DEFAULT_CONVERSION_RATE,
  DEFAULT_INTERACTIONS_ANALYTICS,
  DEFAULT_PROPERTIES_ANALYTICS,
  LOCAL_STORAGE_KEYS,
  navigationLinks
} from '@constants'
import { isSavedAnalytics } from '@guards'
import { useGetPropertiesAnalytics } from '@hooks'
import { Box, Card, Flex, Skeleton, Stack, Text } from '@mantine/core'
import moment from 'moment'
import { useTranslations } from 'next-intl'

import StatsCard from '@components/Analytics/StatsCard'
import FullScreenError from '@components/FullScreenError'
import {
  calculatePercentageDifference,
  getFromLocalStorage,
  saveToLocalStorage
} from '@utils'

import AdminAnalyticsProperties from './AdminAnalyticsProperties'
import AdminTopPerformers from './AdminTopPerformers'
import AdminUsersAnalytics from './AdminUsersAnalytics'

function AnalyticsLoading() {
  return (
    <Box>
      <Box className='grid grid-cols-3 gap-4'>
        <Skeleton height={16} width='90%' mb={8} className='col-span-2' />
        <Skeleton height={16} width='60%' mb={8} />
        <Skeleton height={24} width='80%' mb={16} className='col-span-3' />
        <Skeleton height={12} width='40%' className='col-span-2' />
        <Skeleton height={12} width='20%' />
      </Box>
    </Box>
  )
}

function AdminAnalytics() {
  const t = useTranslations()
  const { data, isError, error, isLoading } = useGetPropertiesAnalytics({})

  const savedAnalytics = useMemo(() => {
    return getFromLocalStorage(
      LOCAL_STORAGE_KEYS.ADMIN_ANALYTICS,
      isSavedAnalytics
    )
  }, [
    getFromLocalStorage(LOCAL_STORAGE_KEYS.ADMIN_ANALYTICS, isSavedAnalytics)
  ])

  const savedInteractionsAnalytics =
    useRef<InteractionsPropertiesAnalytics | null>(null)
  const savedPropertiesAnalytics = useRef<PropertiesAnalytics | null>(null)
  const savedConversionRate = useRef<number | null>(null)

  const { conversionRate, propertiesAnalytics, interactionsAnalytics } =
    useMemo(
      () => ({
        conversionRate: data?.conversionRate,
        propertiesAnalytics: data?.propertiesAnalytics,
        interactionsAnalytics: data?.interactionsAnalytics
      }),
      [data]
    )

  useEffect(() => {
    const lastSavedAt = savedAnalytics?.savedAt
      ? moment(savedAnalytics.savedAt)
      : // if no saved analytics, set the last saved at to 2 days ago
        moment().subtract(2, 'day')
    // For setting the ref values from the local storage
    if (
      savedAnalytics &&
      !savedInteractionsAnalytics.current &&
      !savedPropertiesAnalytics.current &&
      !savedConversionRate.current
    ) {
      savedInteractionsAnalytics.current = savedAnalytics.interactionsAnalytics
      savedPropertiesAnalytics.current = savedAnalytics.propertiesAnalytics
      savedConversionRate.current = savedAnalytics.conversionRate
    }
    return () => {
      if (
        conversionRate &&
        propertiesAnalytics &&
        interactionsAnalytics &&
        lastSavedAt.isBefore(moment().subtract(1, 'day'))
      ) {
        saveToLocalStorage(LOCAL_STORAGE_KEYS.ADMIN_ANALYTICS, {
          interactionsAnalytics,
          propertiesAnalytics,
          conversionRate,
          savedAt: moment().toISOString()
        })
      }
    }
  }, [
    savedAnalytics,
    conversionRate,
    propertiesAnalytics,
    interactionsAnalytics
  ])

  const statsData = useMemo(() => {
    const currentSavedInteractionsAnalytics =
      savedInteractionsAnalytics.current || DEFAULT_INTERACTIONS_ANALYTICS
    return currentSavedInteractionsAnalytics && interactionsAnalytics
      ? [
          {
            icon: navigationLinks.assets.analytics.user,
            title: t('sharedAnalytics.interactions.visitors'),
            value: {
              value: interactionsAnalytics.visitors
            },
            percentage: calculatePercentageDifference(
              interactionsAnalytics.visitors,
              currentSavedInteractionsAnalytics.visitors
            )
          },

          {
            icon: navigationLinks.assets.analytics.check,
            title: t('sharedAnalytics.interactions.impressions'),
            value: {
              value: interactionsAnalytics.impressions
            },
            percentage: calculatePercentageDifference(
              interactionsAnalytics.impressions,
              currentSavedInteractionsAnalytics.impressions
            )
          },
          {
            icon: navigationLinks.assets.analytics.clicks,
            title: t('sharedAnalytics.interactions.adViews'),
            value: {
              value: interactionsAnalytics.views
            },
            percentage: calculatePercentageDifference(
              interactionsAnalytics.views,
              currentSavedInteractionsAnalytics.views
            )
          },
          {
            icon: navigationLinks.assets.analytics.email,
            title: t('sharedAnalytics.interactions.emailsClicks'),
            value: {
              value: interactionsAnalytics.email
            },
            percentage: calculatePercentageDifference(
              interactionsAnalytics.email,
              currentSavedInteractionsAnalytics.email
            )
          },
          {
            icon: navigationLinks.assets.analytics.phone,
            title: t('sharedAnalytics.interactions.phoneCallsClicks'),
            value: {
              value: interactionsAnalytics.phone
            },
            percentage: calculatePercentageDifference(
              interactionsAnalytics.phone,
              currentSavedInteractionsAnalytics.phone
            )
          },
          {
            icon: navigationLinks.assets.analytics.whats,
            title: t('sharedAnalytics.interactions.whatsappClicks'),
            value: {
              value: interactionsAnalytics.whatsapp
            },
            percentage: calculatePercentageDifference(
              interactionsAnalytics.whatsapp,
              currentSavedInteractionsAnalytics.whatsapp
            )
          },
          {
            icon: navigationLinks.assets.analytics.chat,
            title: t('sharedAnalytics.interactions.chats'),
            value: {
              value: interactionsAnalytics.chat
            },
            percentage: calculatePercentageDifference(
              interactionsAnalytics.chat,
              currentSavedInteractionsAnalytics.chat
            )
          }
        ]
      : []
  }, [interactionsAnalytics, savedInteractionsAnalytics.current])

  const additionalStatsData = useMemo(() => {
    const currentSavedPropertiesAnalytics =
      savedPropertiesAnalytics.current || DEFAULT_PROPERTIES_ANALYTICS
    const currentSavedConversionRate =
      savedConversionRate.current || DEFAULT_CONVERSION_RATE
    return currentSavedPropertiesAnalytics &&
      propertiesAnalytics &&
      conversionRate !== null &&
      conversionRate !== undefined &&
      currentSavedConversionRate !== null &&
      currentSavedConversionRate !== undefined
      ? [
          {
            title: t('sharedAnalytics.propertiesAnalytics.conversionRate'),
            value: {
              value: conversionRate,
              suffix: '%'
            },
            percentage: calculatePercentageDifference(
              conversionRate,
              currentSavedConversionRate
            )
          },
          {
            title: t('sharedAnalytics.propertiesAnalytics.totalSale'),
            value: {
              value: propertiesAnalytics.totalSale
            },
            percentage: calculatePercentageDifference(
              propertiesAnalytics.totalSale,
              currentSavedPropertiesAnalytics.totalSale
            )
          },
          {
            title: t('sharedAnalytics.propertiesAnalytics.totalRent'),
            value: {
              value: propertiesAnalytics.totalRent
            },
            percentage: calculatePercentageDifference(
              propertiesAnalytics.totalRent,
              currentSavedPropertiesAnalytics.totalRent
            )
          },

          {
            title: t('sharedAnalytics.propertiesAnalytics.totalProperties'),
            value: {
              value:
                propertiesAnalytics.totalActiveProperties +
                propertiesAnalytics.totalInactiveProperties
            },
            percentage: calculatePercentageDifference(
              propertiesAnalytics.totalActiveProperties +
                propertiesAnalytics.totalInactiveProperties,
              currentSavedPropertiesAnalytics.totalActiveProperties +
                currentSavedPropertiesAnalytics.totalInactiveProperties
            )
          },
          {
            title: t('sharedAnalytics.propertiesAnalytics.averageSellingPrice'),
            value: {
              prefix: 'AED ',
              value: propertiesAnalytics.averageSellingPrice
            },
            percentage: calculatePercentageDifference(
              propertiesAnalytics.averageSellingPrice,
              currentSavedPropertiesAnalytics.averageSellingPrice
            )
          },
          {
            title: t(
              'sharedAnalytics.propertiesAnalytics.averageDailyRentingPrice'
            ),
            value: {
              prefix: 'AED ',
              value: propertiesAnalytics.averageRentingPriceDaily
            },
            percentage: calculatePercentageDifference(
              propertiesAnalytics.averageRentingPriceDaily,
              currentSavedPropertiesAnalytics.averageRentingPriceDaily
            )
          },
          {
            title: t(
              'sharedAnalytics.propertiesAnalytics.averageMonthlyRentingPrice'
            ),
            value: {
              prefix: 'AED ',
              value: propertiesAnalytics.averageRentingPriceMonthly
            },
            percentage: calculatePercentageDifference(
              propertiesAnalytics.averageRentingPriceMonthly,
              currentSavedPropertiesAnalytics.averageRentingPriceMonthly
            )
          },

          {
            title: t(
              'sharedAnalytics.propertiesAnalytics.averageYearlyRentingPrice'
            ),
            value: {
              prefix: 'AED ',
              value: propertiesAnalytics.averageRentingPriceYearly
            },
            percentage: calculatePercentageDifference(
              propertiesAnalytics.averageRentingPriceYearly,
              currentSavedPropertiesAnalytics.averageRentingPriceYearly
            )
          }
        ]
      : []
  }, [
    propertiesAnalytics,
    savedPropertiesAnalytics.current,
    conversionRate,
    savedConversionRate.current
  ])
  if (isLoading) return <AnalyticsLoading />
  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack className='px-4 py-10 font-lexend md:px-8 lg:px-12'>
      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Text className='mb-4 text-lg font-semibold'>
          {t('sharedAnalytics.interactions.title')}
        </Text>
        <Box className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {statsData.map((item) => (
            <StatsCard
              key={item.title}
              stat={item}
              lastSavedAt={savedAnalytics?.savedAt}
            />
          ))}
        </Box>
      </Card>

      <AdminUsersAnalytics />
      <Flex className='flex-col gap-4 lg:flex-row'>
        <Box className='w-full lg:w-[65%]'>
          <AdminAnalyticsProperties properties={data?.topPerformers} />
        </Box>

        <AdminTopPerformers />
      </Flex>

      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Text className='mb-4 text-lg font-semibold'>
          {t('sharedAnalytics.propertiesAnalytics.title')}
        </Text>
        <Box className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {additionalStatsData.map((item) => (
            <StatsCard
              key={item.title}
              stat={item}
              lastSavedAt={savedAnalytics?.savedAt}
            />
          ))}
        </Box>
      </Card>
    </Stack>
  )
}

export default AdminAnalytics
