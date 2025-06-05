'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { RecommendationTypeEnumType, UserRole } from '@commonTypes'
import {
  defaultLimitOptions,
  getAffordablePropertySearches,
  getExploreMoreInProperties,
  navigationLinks,
  propertySortOptions
} from '@constants'
import { Modules } from '@enums'
import { isDark } from '@guards'
import {
  useGetUserPermissions,
  usePropertiesList,
  useProtectAction,
  useUser
} from '@hooks'
import {
  Box,
  Button,
  Flex,
  Group,
  Skeleton,
  Stack,
  Text,
  useMantineColorScheme
} from '@mantine/core'
import GuestBanner from '@sections/Landing/GuestBanner'
import { useTranslations } from 'next-intl'
import { BiPlus, BiX } from 'react-icons/bi'
import { FaCoins } from 'react-icons/fa'

import { useGetMySubscription } from '@hooks/query/subscriptions/useGetMySubscription'
import AppPagination from '@components/AppPagination'
import Breadcrumb from '@components/Breadcrumb'
import ChangeLayoutButton from '@components/Buttons/ChangeLayoutButton'
import SavedButton from '@components/Buttons/SavedButton'
import EmptyWrapper from '@components/EmptyWrapper'
import Filters from '@components/Filters/PropertyFilters'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LimitButton from '@components/LimitButton'
import Map from '@components/Map'
import PropertiesPaper from '@components/PropertiesPaper'
import PropertyCard, {
  LayoutType,
  PropertyCardSkeleton
} from '@components/PropertyCard'
import PropertyMapCard from '@components/PropertyMapCard'
import SortButton from '@components/SortButton'

export interface PropertiesRecommendedTitleProps {
  title?: string
  src?: string
  alt?: string
}

function PropertiesRecommendedTitle({
  title,
  src,
  alt
}: PropertiesRecommendedTitleProps) {
  return (
    <Flex className='items-center gap-2'>
      {src && <Image width={40} height={40} src={src} alt={alt || ''} />}
      <Text className='text-2xl font-bold text-neutral-700 md:text-4xl'>
        {title}
      </Text>
    </Flex>
  )
}

export interface PropertiesSectionProps
  extends PropertiesRecommendedTitleProps {
  recommended?: RecommendationTypeEnumType
}

function PropertiesSection({
  recommended,
  title,
  src,
  alt
}: PropertiesSectionProps) {
  const pathname = usePathname()
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('shared.breadcrumb.properties'),
      link: navigationLinks.properties.allProperties
    }
  ]

  const router = useRouter()
  const { user } = useUser()
  const protectAction = useProtectAction()

  const handleShowCredits = () => {
    if (user?.role === UserRole.Company) return true
    if (user?.role === UserRole.Broker) return true

    return false
  }

  const { data: subscriptionData, isLoading: isSubscriptionLoading } =
    useGetMySubscription({
      enabled: handleShowCredits()
    })
  const { colorScheme } = useMantineColorScheme()
  const [layout, setLayout] = useState<LayoutType>('vertical')
  const [showMap, setShowMap] = useState(false)

  const {
    properties,
    data,
    mapProperties,
    selectedMapProperties,
    setSelectedMapProperties,
    isLoading,
    isError,
    error,
    sort,
    setSort,
    limit,
    setLimit,

    filters,
    setFilters
  } = usePropertiesList({ recommended })

  const { permissions } = useGetUserPermissions(Modules.PROPERTIES)
  const {
    canViewMyProperties,
    canViewSavedProperties,
    canViewContactUsBanner,
    canAddXml
  } = permissions

  const handlePaperProps = () => {
    if (
      user &&
      (user.role === UserRole.Company || user.role === UserRole.Broker)
    ) {
      return {
        title: t('properties.recommendBanner.title'),
        description: t('properties.recommendBanner.description'),
        buttonTitle: t('properties.recommendBanner.buttonTitle'),
        buttonOnClick: () => router.push(navigationLinks.subscription.credits)
      }
    }
    if (!user) {
      return {
        title: t('properties.mainBanner.title'),
        description: t('properties.mainBanner.description'),
        buttonTitle: t('properties.mainBanner.buttonTitle'),
        buttonOnClick: () =>
          protectAction({
            redirectUrl: navigationLinks.properties.addProperty
          })
      }
    }
    return null
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <>
      {pathname === navigationLinks.properties.allProperties && (
        <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      )}
      <Stack gap='md'>
        {isSubscriptionLoading && <Skeleton height={20} width={60} />}
        {handleShowCredits() && !isSubscriptionLoading && (
          <Flex className='items-center gap-2 text-sm'>
            <Text>
              {t('premium.availableCredits')}:{' '}
              {subscriptionData?.subscription.credits}
            </Text>
            <FaCoins className='text-primary' />
          </Flex>
        )}
        <PropertiesPaper {...handlePaperProps()} />

        <Group className='mt-4 w-full items-baseline justify-between'>
          <Stack>
            {!src ? (
              <Text
                component='h1'
                className='text-2xl font-bold text-neutral-700 md:text-4xl'
              >
                {t('properties.title')}
              </Text>
            ) : (
              <PropertiesRecommendedTitle title={title} src={src} alt={alt} />
            )}
            <Text
              component='p'
              className='text-sm font-semibold capitalize text-neutral-600'
            >
              {data?.total === 1
                ? `${data?.total.toLocaleString('en-US') || ''} ${t('properties.property')}`
                : `${data?.total.toLocaleString('en-US') || ''} ${t('properties.properties')}`}
            </Text>
          </Stack>
          <Group>
            {canViewMyProperties && (
              <Button
                variant='light'
                color='gray'
                className='w-fit rounded-lg font-semibold text-primary'
                size='lg'
                component={Link}
                href={navigationLinks.properties.myListings}
              >
                {t('properties.mineTitle')}
              </Button>
            )}
            {canAddXml && (
              <Button
                component={Link}
                href={navigationLinks.properties.addXml}
                variant='light'
                color='gray'
                className='rounded-lg font-semibold text-primary'
                size='lg'
                leftSection={<BiPlus size={24} />}
              >
                {t('properties.buttons.addXml')}
              </Button>
            )}
            {canViewSavedProperties && <SavedButton />}
          </Group>
        </Group>

        <Filters filters={filters} onFiltersChange={setFilters} />

        <Group className='justify-between'>
          <Box className='flex w-full max-w-[410px] items-center gap-2'>
            <SortButton
              radius='xl'
              value={sort ? JSON.stringify(sort) : null}
              onChange={(value) => {
                setSort(value ? JSON.parse(value) : null)
              }}
              data={propertySortOptions(t)}
            />
            <LimitButton
              radius='xl'
              value={limit}
              onChange={(value) => {
                setLimit(value ?? defaultLimitOptions[0].value)
              }}
              data={defaultLimitOptions}
            />
          </Box>
          <Group>
            <ChangeLayoutButton
              className='border border-default-background/20'
              layout={layout}
              setLayout={setLayout}
            />
            <Button
              onClick={() => setShowMap(!showMap)}
              variant='transparent'
              className='border border-default-background/20 text-default-text'
              leftSection={
                <Image
                  width={20}
                  height={20}
                  src={
                    isDark(colorScheme)
                      ? navigationLinks.assets.locationDark
                      : navigationLinks.assets.location
                  }
                  alt='location pointer'
                  className='dark:brightness-200'
                />
              }
              radius='xl'
            >
              {t('properties.buttons.viewOnMap')}
            </Button>
          </Group>
        </Group>
        {properties?.length > 0 && showMap ? (
          <Box className='relative z-10 flex h-[70dvh] w-full justify-start gap-1'>
            <Map
              renderTooltip={(items) => (
                <Box className='flex h-24 w-52 flex-col gap-2 overflow-y-scroll'>
                  {items.map((item) => (
                    <PropertyMapCard
                      className='h-12 w-full flex-shrink-0'
                      key={item._id}
                      property={item}
                    />
                  ))}
                </Box>
              )}
              onMarkerItemsClick={(items) => {
                setSelectedMapProperties(items)
              }}
              markerItems={mapProperties}
              className='h-full flex-[3]'
            />
            {selectedMapProperties.length > 0 && (
              <>
                {/* Desktop Map Properties */}
                <Box className='flex[1] hidden h-full w-1/4 flex-col gap-2 overflow-y-scroll md:flex'>
                  <Flex className='w-full items-center justify-between'>
                    <Text className='text-lg font-bold'>
                      {t('properties.buttons.selectedProperties')}
                    </Text>
                    <Button
                      variant='transparent'
                      color='gray'
                      size='sm'
                      className='justify-end'
                      onClick={() => setSelectedMapProperties([])}
                      leftSection={<BiX size={24} />}
                    >
                      {t('properties.buttons.clear')}
                    </Button>
                  </Flex>
                  {selectedMapProperties.map((item) => (
                    <PropertyMapCard
                      className='py-2'
                      key={item._id}
                      property={item}
                    />
                  ))}
                </Box>
                {/* Mobile Map Properties */}
                <Box className='absolute inset-x-0 bottom-0 z-[400] flex w-full gap-2 overflow-x-scroll px-2 pb-2 md:hidden'>
                  {selectedMapProperties.map((item) => (
                    <PropertyMapCard
                      className='w-3/4 flex-shrink-0 bg-white py-2'
                      key={item._id}
                      property={item}
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
        ) : (
          <>
            <ItemsWrapper
              loading={isLoading}
              className={`grid grid-cols-1 gap-4 ${layout === 'horizontal' ? 'grid-cols-1 md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}
              LoadingComponent={<PropertyCardSkeleton />}
              EmptyComponent={
                <EmptyWrapper
                  description={t('shared.emptyDescription', {
                    itemName: t('properties.title')
                  })}
                />
              }
            >
              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  layout={layout}
                  property={property}
                />
              ))}
            </ItemsWrapper>
            <Box className='mt-8 flex items-center justify-center'>
              <AppPagination
                value={data?.page || (filters.page ? Number(filters.page) : 1)}
                onChange={(value) =>
                  setFilters({ ...filters, page: String(value) })
                }
                total={data?.totalPages ?? 0}
              />
            </Box>
          </>
        )}

        <Box>
          {/* Section Container */}
          <Box className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
            {/* Affordable Searches */}
            <Box>
              <Text
                component='h2'
                className='mb-4 text-xl font-bold text-neutral-700'
              >
                {t('properties.footer.affordableSearches.title')}
              </Text>
              <ul className='flex flex-col gap-2'>
                {getAffordablePropertySearches(t).map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className='text-neutral-500 underline hover:no-underline'
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>

            {/* Explore More */}

            <Box>
              <Text
                component='h2'
                className='mb-4 text-xl font-bold text-neutral-700'
              >
                {t('properties.footer.exploreMore.title')}
              </Text>
              <ul className='flex flex-col gap-2'>
                {getExploreMoreInProperties(t).map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className='text-neutral-500 underline hover:no-underline'
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        </Box>
        {canViewContactUsBanner && (
          <GuestBanner
            className='hidden md:block lg:px-0'
            buttonTitle={t('homePage.guestBanner.properties.buttonTitle')}
            description={t('homePage.guestBanner.properties.description')}
            title={t('homePage.guestBanner.properties.title')}
          />
        )}
      </Stack>
    </>
  )
}

export default PropertiesSection
