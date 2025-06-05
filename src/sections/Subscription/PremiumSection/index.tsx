'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  PropertyStatusEnum,
  RecommendationTypeEnum,
  RecommendationTypeEnumType
} from '@commonTypes'
import { navigationLinks } from '@constants'
import { usePropertiesList, useUser } from '@hooks'
import { Flex, Skeleton, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiPlus } from 'react-icons/bi'
import { FaCoins } from 'react-icons/fa'

import { useGetMySubscription } from '@hooks/query/subscriptions/useGetMySubscription'
import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import PrimaryButton from '@components/Buttons/PrimaryButton'
import FullScreenError from '@components/FullScreenError'
import AddFeaturedPropertyModal from '@components/Subscription/AddFeaturedPropertyModal'
import PremiumTab from '@components/Subscription/PremiumTab'
import TopUpCreditsModal from '@components/Subscription/TopUpCreditModal'

function PremiumSectionSkeleton() {
  return (
    <Stack className='gap-8 px-4 md:px-12'>
      <Skeleton height={40} width='60%' className='mx-auto' />
      {/* Header */}
      <Stack className='my-16 items-center gap-4'>
        <Skeleton height={150} width={150} circle />
        <Stack className='items-center gap-2'>
          <Skeleton height={28} width='40%' />
          <Skeleton height={32} width='30%' />
        </Stack>
        <Skeleton height={20} width='80%' className='mx-auto' />
        <Skeleton height={50} width={200} radius='md' />
      </Stack>
      {/* Featured Properties */}
      <Skeleton height={50} width='100%' />
      <Stack>
        <Skeleton height={400} width='100%' />
      </Stack>
    </Stack>
  )
}

function PremiumSection() {
  const t = useTranslations()
  const { user, loading } = useUser()
  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
    error: subscriptionError
  } = useGetMySubscription()

  const [openTopCreditsModal, setOpenTopCreditsModal] = useState(false)
  const [openAddFeaturedPropertyModal, setOpenAddFeaturedPropertyModal] =
    useState(false)

  const descriptions = {
    [RecommendationTypeEnum.HotDeal]: t('premium.descriptions.hotDeal'),
    [RecommendationTypeEnum.Signature]: t('premium.descriptions.signature'),
    [RecommendationTypeEnum.PropertyOfTheWeek]: t(
      'premium.descriptions.propertyOfTheWeek'
    )
  }

  const [recommended, setRecommended] = useState<RecommendationTypeEnumType>(
    RecommendationTypeEnum.HotDeal
  )

  const { isFetching, data, isLoading, setPage, page } = usePropertiesList({
    status: PropertyStatusEnum.Active,
    recommended,
    mine: 'true'
  })

  const controlsData = [
    {
      label: `${t('premium.tabs.hotDeal')} ${recommended === RecommendationTypeEnum.HotDeal && data?.total! >= 0 ? `(${data?.total})` : ''}`,
      value: RecommendationTypeEnum.HotDeal
    },
    {
      label: `${t('premium.tabs.signature')} ${recommended === RecommendationTypeEnum.Signature && data?.total! >= 0 ? `(${data?.total})` : ''}`,
      value: RecommendationTypeEnum.Signature
    },
    {
      label: `${t('premium.tabs.propertyOfTheWeek')} ${recommended === RecommendationTypeEnum.PropertyOfTheWeek && data?.total! >= 0 ? `(${data?.total})` : ''}`,
      value: RecommendationTypeEnum.PropertyOfTheWeek
    }
  ]

  if (isSubscriptionLoading) return <PremiumSectionSkeleton />
  if (isSubscriptionError) return <FullScreenError error={subscriptionError} />
  return (
    <Stack className='gap-8 px-4 md:px-12'>
      {openAddFeaturedPropertyModal && (
        <AddFeaturedPropertyModal
          open={openAddFeaturedPropertyModal}
          setOpen={setOpenAddFeaturedPropertyModal}
          recommendationType={recommended}
        />
      )}
      {openTopCreditsModal && (
        <TopUpCreditsModal
          open={openTopCreditsModal}
          setOpen={setOpenTopCreditsModal}
        />
      )}

      <Text
        component='h1'
        className='text-center text-2xl font-bold text-neutral-700 lg:text-4xl'
      >
        {t('premium.title')}
      </Text>
      {/* Header */}
      <Stack className='my-16 items-center gap-4'>
        <Image
          src={navigationLinks.assets.subscription.credits}
          alt='Credits'
          width={150}
          height={150}
        />
        <Stack className='items-center'>
          <Text component='h2' className='text-lg font-light md:text-2xl'>
            {t('premium.availableCredits')}
          </Text>
          <Flex className='items-center gap-2'>
            <Text className='text-lg font-bold md:text-3xl'>
              {subscriptionData?.subscription.credits}
            </Text>
            <FaCoins className='text-2xl text-primary' />
          </Flex>
        </Stack>
        <Text className='m-auto text-center text-sm text-neutral-700 md:w-[60%]'>
          {t('premium.creditsDescription')}
        </Text>
        <PrimaryButton
          radius='md'
          size='lg'
          type='button'
          onClick={() => {
            setOpenTopCreditsModal(true)
          }}
          leftSection={<BiPlus size={22} />}
          className='text-lg font-bold text-secondary hover:bg-primary/80'
        >
          {t('premium.topUpCredits.title')}
        </PrimaryButton>
      </Stack>
      {/* Featured Properties */}

      {user && !loading && (
        <AppFragmentTabsControl
          notActiveBg='bg-brand-200/50'
          textColor='text-neutral-600'
          data={controlsData}
          value={recommended}
          onChange={(value) => {
            setRecommended(value as RecommendationTypeEnumType)
          }}
        />
      )}
      {user && !loading && (
        <>
          {recommended === RecommendationTypeEnum.HotDeal && (
            <PremiumTab
              data={data}
              isLoading={isLoading || isFetching}
              description={descriptions[RecommendationTypeEnum.HotDeal]}
              onAddFeaturedProperty={() =>
                setOpenAddFeaturedPropertyModal(true)
              }
              page={page}
              setPage={(value) => setPage(String(value))}
            />
          )}
          {recommended === RecommendationTypeEnum.Signature && (
            <PremiumTab
              data={data}
              isLoading={isLoading || isFetching}
              description={descriptions[RecommendationTypeEnum.Signature]}
              onAddFeaturedProperty={() =>
                setOpenAddFeaturedPropertyModal(true)
              }
              page={page}
              setPage={(value) => setPage(String(value))}
            />
          )}
          {recommended === RecommendationTypeEnum.PropertyOfTheWeek && (
            <PremiumTab
              data={data}
              isLoading={isLoading || isFetching}
              description={
                descriptions[RecommendationTypeEnum.PropertyOfTheWeek]
              }
              onAddFeaturedProperty={() =>
                setOpenAddFeaturedPropertyModal(true)
              }
              page={page}
              setPage={(value) => setPage(String(value))}
            />
          )}
        </>
      )}
    </Stack>
  )
}

export default PremiumSection
