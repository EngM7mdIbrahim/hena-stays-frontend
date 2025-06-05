'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Amenity } from '@commonTypes'
import { DEFAULT_PROPERTY_FORM_DATA, navigationLinks } from '@constants'
import { SellPropertyRequestFormContext } from '@context'
import { useGetAmenities } from '@hooks'
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Skeleton,
  Stack,
  TagsInput,
  Text,
  UnstyledButton
} from '@mantine/core'
import { BasicInformationProps } from '@sections/Auth/SignUp/Company/Steps/BasicInformation'
import { DetailsProps } from '@sections/Blog/Steps/Details'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import { appNotifications, cn } from '@utils'

const { useSellPropertyRequestFormContext } = SellPropertyRequestFormContext

export interface FeatureCardIconProps {
  src: string
  alt: string
}

export function CardIcon({ src, alt }: FeatureCardIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className='h-auto w-auto'
      width={34}
      height={34}
    />
  )
}

function AmenitiesLoading() {
  return (
    <Box className='grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-5'>
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton
          className='h-[200px] w-full rounded-md border border-gray-100'
          key={i}
        />
      ))}
    </Box>
  )
}

function PropertyFeaturesForm({
  onNext,
  onBack
}: Pick<BasicInformationProps, 'onNext'> & Pick<DetailsProps, 'onBack'>) {
  const t = useTranslations()
  const form = useSellPropertyRequestFormContext()

  const [otherFeaturesSearchValue, setOtherFeaturesSearchValue] = useState('')

  const getAmenities = useGetAmenities({
    limit: '50'
  })

  const basicAmenities = getAmenities.data?.items

  const toggleSelection = (id: string) => {
    const currentSelections =
      (form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA)?.amenities
        ?.basic || []

    if (currentSelections.includes(id)) {
      // Remove from selected
      form.setFieldValue(
        'amenities.basic',
        currentSelections.filter((amenity) => amenity !== id)
      )
    } else {
      // Add to selected
      form.setFieldValue('amenities.basic', [...currentSelections, id])
    }
  }

  // Select All
  const selectAll = () => {
    form.setFieldValue(
      'amenities.basic',
      basicAmenities?.map((amenity: Amenity) => amenity._id)
    )
  }

  // Deselect All
  const deselectAll = () => {
    form.setFieldValue('amenities.basic', [])
  }

  if (getAmenities?.isLoading) {
    return <AmenitiesLoading />
  }

  return (
    <Stack className='py-12'>
      <Flex className='justify-between'>
        <Flex className='flex gap-1'>
          <Text className='font-semibold text-default-text'>
            {t('properties.propertyForm.features.title')}
          </Text>
          <Text className='font-semibold text-neutral-700/60'>{`(${(form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA).amenities?.basic?.length || 0} ${t('properties.propertyForm.features.selected')}) `}</Text>
        </Flex>
        <UnstyledButton
          onClick={
            (form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA).amenities
              ?.basic?.length === 13
              ? deselectAll
              : selectAll
          }
          className='text-primary underline hover:no-underline'
        >
          {(form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA).amenities
            ?.basic?.length === 13
            ? t('properties.propertyForm.features.deselectAll')
            : t('properties.propertyForm.features.selectAll')}
        </UnstyledButton>
      </Flex>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-4 lg:grid-cols-5'>
        {basicAmenities?.map((amenity) => (
          <Stack
            onClick={() => toggleSelection(amenity._id)}
            key={amenity._id}
            className={cn(
              'cursor-pointer items-center justify-center gap-2 rounded-md border border-neutral-200 bg-default-background p-8 text-center md:flex-1',

              (
                form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA
              ).amenities?.basic?.includes(amenity._id) && 'border-primary'
            )}
          >
            <Box>
              <CardIcon alt={amenity.name} src={amenity.image} />
            </Box>
            <Text className='text-neutral-700'>{amenity.name}</Text>
          </Stack>
        ))}
      </div>
      {/* input to add more features (optional) + button to add */}
      <Flex className='mt-4 items-end gap-2'>
        <TagsInput
          acceptValueOnBlur={false}
          searchValue={otherFeaturesSearchValue}
          onSearchChange={(value) => {
            setOtherFeaturesSearchValue(value)
          }}
          className='flex-1'
          classNames={{
            pill: 'bg-default-background',
            input: cn(
              'w-full rounded-md mt-2 bg-default-background  border border-neutral-400  focus:border-neutral-300 focus:outline-none'
            )
          }}
          onRemove={(value) => {
            form.setFieldValue(
              'amenities.other',
              (
                form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA
              )?.amenities?.other.filter((amenity) => amenity !== value)
            )
          }}
          value={
            (form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA)?.amenities
              ?.other || []
          }
          onChange={(value) => {
            form.setFieldValue('amenities.other', value)
          }}
          size='md'
          placeholder={t('properties.propertyForm.features.otherPlaceholder')}
          label={
            <label>
              <Text
                component='span'
                className='text-sm font-bold text-neutral-500'
              >
                {t('properties.propertyForm.features.other')} (
                {t('shared.optional')})
              </Text>
            </label>
          }
        />
        <ActionIcon
          onClick={() => {
            if (otherFeaturesSearchValue) {
              if (otherFeaturesSearchValue.trim() === '') {
                appNotifications.error(
                  t('properties.propertyForm.features.errors.required')
                )
                return
              }
              // check if the value is already in the array
              if (
                (
                  form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA
                )?.amenities?.other?.includes(otherFeaturesSearchValue)
              ) {
                appNotifications.error(
                  t('properties.propertyForm.features.errors.alreadyAdded')
                )
                return
              }

              const values =
                form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA

              form.setFieldValue('amenities.other', [
                ...(values?.amenities?.other ?? []),
                otherFeaturesSearchValue
              ])
              setOtherFeaturesSearchValue('')
            }
          }}
          type='button'
          className='text-primary'
          variant='outline'
          size={40}
          aria-label='add feature'
        >
          <Image
            alt='plus'
            src={navigationLinks.assets.plus}
            width={15}
            height={15}
          />
        </ActionIcon>
      </Flex>
      <Group>
        <Button
          onClick={onBack}
          variant='light'
          color='gray'
          className='w-full rounded-lg font-semibold text-primary md:flex-1'
          size='lg'
        >
          {t('shared.buttons.back')}
        </Button>
        <PrimaryButton
          onClick={onNext}
          size='lg'
          className='w-full rounded-lg font-semibold text-secondary md:flex-1'
        >
          {t('shared.buttons.next')}
        </PrimaryButton>
      </Group>
    </Stack>
  )
}

export default PropertyFeaturesForm
