'use client'

import React, { Dispatch, SetStateAction } from 'react'
import {
  MediaTypes,
  PropertyStatusEnum,
  RecommendationTypeEnum,
  RecommendationTypeEnumType
} from '@commonTypes'
import { DEFAULT_ADD_FEATURED_PROPERTY_FORM_DATA } from '@constants'
import {
  useBulkUpdateRecommendations,
  useGetConfig,
  usePropertiesList
} from '@hooks'
import {
  Avatar,
  Box,
  Button,
  CheckIcon,
  Flex,
  Group,
  Loader,
  Stack,
  Text
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTranslations } from 'next-intl'
import { BiSearch } from 'react-icons/bi'
import { FaCoins } from 'react-icons/fa'

import { useGetMySubscription } from '@hooks/query/subscriptions/useGetMySubscription'
import PrimaryButton from '@components/Buttons/PrimaryButton'
import MultiSelectField from '@components/CustomFields/MultiSelectField'
import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'
import AppModal from '@components/Modals/AppModal'
import { appNotifications, cn } from '@utils'

export interface AddFeaturedPropertyModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  recommendationType: RecommendationTypeEnumType
}

function AddFeaturedPropertyModal({
  open,
  setOpen,
  recommendationType
}: AddFeaturedPropertyModalProps) {
  const t = useTranslations()
  const periods = [7, 14, 30]
  let recommendKey: 'hot' | 'signature' | 'propertyOfWeek' = 'hot'
  switch (recommendationType) {
    case RecommendationTypeEnum.HotDeal:
      recommendKey = 'hot'
      break
    case RecommendationTypeEnum.Signature:
      recommendKey = 'signature'
      break
    case RecommendationTypeEnum.PropertyOfTheWeek:
      recommendKey = 'propertyOfWeek'
      break
    default:
      recommendKey = 'hot'
  }

  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
    error: subscriptionError
  } = useGetMySubscription()
  const {
    data: configData,
    isLoading: isConfigLoading,
    isError: isConfigError,
    error: configError
  } = useGetConfig()

  const { mutate: bulkUpdateRecommendations, isPending: isUpdating } =
    useBulkUpdateRecommendations({
      onSuccess: () => {
        setOpen(false)
        appNotifications.success('Properties Recommended successfully')
      }
    })

  const { properties, isLoading, search, setSearch, isError, error } =
    usePropertiesList({
      status: PropertyStatusEnum.Active,
      recommended: RecommendationTypeEnum.None,
      mine: 'true'
    })

  const propertiesOptions = properties?.map((property) => ({
    value: `${property.title}-${property._id}`,
    label: property.title
  }))

  const { setFieldValue, values, getInputProps, onSubmit } = useForm({
    initialValues: DEFAULT_ADD_FEATURED_PROPERTY_FORM_DATA
  })

  const totalCost =
    (configData?.config?.propertyRecommendations?.[recommendKey]?.find(
      (item) => item.noExpireDays === values.period
    )?.price ?? 0) * (values.propertyIds?.length ?? 0)

  const isDisabled =
    (subscriptionData?.subscription?.credits &&
      subscriptionData?.subscription?.credits < totalCost) ||
    false

  const isErrorGlobal = isSubscriptionError || isConfigError || isError
  const errorMessage = subscriptionError || configError || error
  const isLoadingGlobal = isSubscriptionLoading || isConfigLoading

  const handleSubmit = (
    formData: typeof DEFAULT_ADD_FEATURED_PROPERTY_FORM_DATA
  ) => {
    bulkUpdateRecommendations({
      propertyIds: formData.propertyIds.map((id) => id.split('-')[1]),
      recommended: recommendationType,
      recommendationNoExpireDays: formData.period
    })
  }

  let content = null

  let title = ''

  switch (recommendationType) {
    case RecommendationTypeEnum.HotDeal:
      title = t('premium.addFeaturedProperty.title', {
        recommendationType: t('premium.tabs.hotDeal')
      })
      break
    case RecommendationTypeEnum.Signature:
      title = t('premium.addFeaturedProperty.title', {
        recommendationType: t('premium.tabs.signature')
      })
      break
    case RecommendationTypeEnum.PropertyOfTheWeek:
      title = t('premium.addFeaturedProperty.title', {
        recommendationType: t('premium.tabs.propertyOfTheWeek')
      })
      break
    default:
      title = t('premium.addFeaturedProperty.title', {
        recommendationType: t('premium.tabs.hotDeal')
      })
  }

  if (isErrorGlobal && errorMessage)
    content = <FullScreenError error={errorMessage} />
  if (isLoadingGlobal) content = <LoaderScreen />

  return (
    <AppModal open={open} setOpen={setOpen} size='lg' title={title}>
      {content}
      {!isErrorGlobal && !isLoadingGlobal && (
        <Box>
          <Flex className='items-center gap-2 text-sm text-neutral-600'>
            <Text>
              {t('premium.topUpCredits.availableCreditsLabel')}:{' '}
              {subscriptionData?.subscription.credits}
            </Text>
            <FaCoins className='text-primary' />
          </Flex>

          <hr className='my-4' />

          <form onSubmit={onSubmit(handleSubmit)} className='space-y-8'>
            <MultiSelectField
              label={t('premium.addFeaturedProperty.featuredProperties')}
              showOptional={false}
              placeholder={t('shared.placeholders.search')}
              data={propertiesOptions}
              searchValue={search}
              onSearchChange={(value) => setSearch(value)}
              renderOption={({ option, checked }) => {
                const property = properties.find(
                  (p) => p._id === option.value.split('-')[1]
                )
                if (!property) return null

                return (
                  <Flex className='items-center gap-2'>
                    {checked && (
                      <CheckIcon size={16} className='text-neutral-600' />
                    )}{' '}
                    <Group gap='sm'>
                      {property.media[0]?.type === MediaTypes.Image ? (
                        <Avatar
                          src={property.media[0]?.url}
                          size={36}
                          radius='xl'
                        />
                      ) : (
                        <Avatar
                          name={property.title}
                          size={36}
                          radius='xl'
                          src={null}
                        />
                      )}
                      <Box>
                        <Text size='sm'>{property.title}</Text>
                        <Text size='xs' opacity={0.5}>
                          {property.location?.city}
                        </Text>
                      </Box>
                    </Group>
                  </Flex>
                )
              }}
              {...getInputProps('propertyIds')}
              searchable
              leftSection={
                isLoading ? <Loader size={16} /> : <BiSearch size={16} />
              }
            />
            <Stack>
              <Text>{t('premium.addFeaturedProperty.featurePeriod')}</Text>
              <Box className='grid grid-cols-1 gap-2 md:grid-cols-3'>
                {periods.map((value) => (
                  <Button
                    variant='outline'
                    size='md'
                    type='button'
                    onClick={() => setFieldValue('period', value)}
                    key={value}
                    className={cn(
                      'rounded-full border border-neutral-200 text-neutral-600 duration-200 hover:border-primary',
                      values.period === value && 'border-primary'
                    )}
                  >
                    {value} {t('premium.addFeaturedProperty.days')}
                  </Button>
                ))}
              </Box>
            </Stack>
            {values.propertyIds.length > 0 && (
              <>
                <hr />
                <Flex className='items-center justify-between'>
                  <Text>
                    {t('premium.addFeaturedProperty.totalCreditsCost')}
                  </Text>
                  <Text className='text-lg font-bold'>
                    {totalCost} {t('premium.addFeaturedProperty.credits')}
                  </Text>
                </Flex>
              </>
            )}
            {isDisabled && (
              <Text className='text-center text-lg font-bold text-error-500'>
                {t('premium.addFeaturedProperty.notEnoughCredits')}
              </Text>
            )}
            <Group>
              <Button
                size='md'
                radius='xl'
                onClick={() => setOpen(false)}
                variant='light'
                color='gray'
                className='w-full font-semibold text-primary md:flex-1'
              >
                {t('premium.addFeaturedProperty.cancel')}
              </Button>
              <PrimaryButton
                loading={isUpdating}
                disabled={isDisabled}
                size='md'
                radius='xl'
                type='submit'
                className='w-full font-semibold text-secondary md:flex-1'
              >
                {t('premium.addFeaturedProperty.buy')}
              </PrimaryButton>
            </Group>
          </form>
        </Box>
      )}
    </AppModal>
  )
}

export default AddFeaturedPropertyModal
