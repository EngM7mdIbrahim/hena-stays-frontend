'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation'
import {
  InteractionsPropertiesAnalytics,
  PropertiesAnalytics,
  UserRole
} from '@commonTypes'
import {
  DEFAULT_CONVERSION_RATE,
  DEFAULT_INTERACTIONS_ANALYTICS,
  DEFAULT_PROPERTIES_ANALYTICS,
  LOCAL_STORAGE_KEYS,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { isSavedAnalytics } from '@guards'
import { useGetPropertiesAnalytics, useProtectRoute, useUser } from '@hooks'
import { Box, Card, Flex, Skeleton, Stack, Text } from '@mantine/core'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import { FaCoins } from 'react-icons/fa'

import { useGetMySubscription } from '@hooks/query/subscriptions/useGetMySubscription'
import StatsCard from '@components/Analytics/StatsCard'
import ShimmerButton from '@components/Buttons/ShimmerButton'
import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'
import {
  calculatePercentageDifference,
  getFromLocalStorage,
  saveToLocalStorage
} from '@utils'

import LatestComments from './LatestComments'
import PropertiesInteractions from './PropertiesInteractions'
import Traffic from './Traffic'

function CreditCard() {
  const t = useTranslations()
  const router = useRouter()
  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
    error: subscriptionError
  } = useGetMySubscription()

  if (isSubscriptionLoading) {
    return <Skeleton height={20} width={70} />
  }
  if (isSubscriptionError && subscriptionError) {
    return <FullScreenError error={subscriptionError} />
  }
  return (
    <Card
      className='space-y-4 border border-neutral-200 font-lexend'
      shadow='sm'
      padding='lg'
      radius='md'
    >
      <Flex className='items-center gap-2 text-sm font-semibold capitalize text-neutral-800'>
        <Text>
          {t('premium.availableCredits')}:{' '}
          {subscriptionData?.subscription.credits}
        </Text>
        <FaCoins className='text-primary' />
      </Flex>
      <ShimmerButton
        onClick={() => {
          router.push(navigationLinks.subscription.credits)
        }}
        title={t('shared.buttons.buyCredits')}
      />
    </Card>
  )
}

function AnalyticsSection() {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { user } = useUser()

  const userId = searchParams.get(SEARCH_PARAM_KEYS.USER_KEY)

  const isLoaded = useProtectRoute(!user?.role.includes(UserRole.Admin))

  useEffect(() => {
    if (
      !isLoaded ||
      (!userId &&
        pathname.includes(navigationLinks.employees.employeesAnalytics))
    ) {
      redirect(navigationLinks.landingPage)
    }
  }, [isLoaded, userId, redirect])

  const { data, isError, error, isLoading } = useGetPropertiesAnalytics({
    filter: {
      ...(userId && { _id: userId })
    }
  })

  const savedAnalytics = useMemo(() => {
    return getFromLocalStorage(LOCAL_STORAGE_KEYS.ANALYTICS, isSavedAnalytics)
  }, [getFromLocalStorage(LOCAL_STORAGE_KEYS.ANALYTICS, isSavedAnalytics)])

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
        saveToLocalStorage(LOCAL_STORAGE_KEYS.ANALYTICS, {
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
  if (isLoading || !isLoaded) {
    return <LoaderScreen />
  }
  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack className='px-4 py-10 font-lexend md:px-8 lg:px-12'>
      <Box className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <CreditCard />
        {statsData.map((item) => (
          <StatsCard
            key={item.title}
            stat={item}
            isLoading={isLoading}
            lastSavedAt={savedAnalytics?.savedAt}
          />
        ))}
      </Box>
      {/* traffic */}
      <Traffic />
      <Box className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {/* latest comments */}
        <LatestComments />
        {/* properties */}
        <PropertiesInteractions />
      </Box>
      <Stack className='rounded-lg border border-neutral-200 p-4'>
        <Text className='text-lg font-semibold'>
          {t(
            'sharedAnalytics.propertiesAnalytics.conversionRatesAndAveragePrices'
          )}
        </Text>
        <Box className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {additionalStatsData.map((item) => (
            <StatsCard
              key={item.title}
              stat={item}
              isLoading={isLoading}
              lastSavedAt={savedAnalytics?.savedAt}
            />
          ))}
        </Box>
      </Stack>
    </Stack>
  )
}

export default AnalyticsSection
