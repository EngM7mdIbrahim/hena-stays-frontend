'use client'

import React, { Fragment } from 'react'
import {
  CompletionEnum,
  FurnishedEnum,
  RentDurationEnum,
  SaleTypeEnum
} from '@commonTypes'
import {
  DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA,
  DEFAULT_PROPERTY_FORM_DATA,
  QUERY_KEYS
} from '@constants'
import { BuyPropertyRequestFormContext } from '@context'
import { useGetAmenities, useGetCategories, useGetSubCategories } from '@hooks'
import {
  Box,
  Flex,
  Group,
  Input,
  InputError,
  Radio,
  Stack,
  Text
} from '@mantine/core'
import { BasicInformationProps } from '@sections/Auth/SignUp/Agent/Steps/BasicInformation'
import { useTranslations } from 'next-intl'
import { CiGps } from 'react-icons/ci'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import LocationField from '@components/CustomFields/LocationField'
import MultiSelectField from '@components/CustomFields/MultiSelectField'
import RadioField from '@components/CustomFields/RadioField'
import RangeField, {
  RangeFieldValue
} from '@components/CustomFields/RangeFields'
import SelectField from '@components/CustomFields/SelectField'
import { cn } from '@utils'

const { useBuyPropertyRequestFormContext } = BuyPropertyRequestFormContext

function PropertyInformation({
  onNext
}: Pick<BasicInformationProps, 'onNext'>) {
  const t = useTranslations()
  const form = useBuyPropertyRequestFormContext()

  const furnishingStatusOptions = Object.values(FurnishedEnum).map(
    (option) => ({
      value: option,
      label: t(`shared.fields.furnishing.${option}`)
    })
  )

  const getAmenities = useGetAmenities({
    limit: '50'
  })

  const basicAmenitiesOptions = getAmenities.data?.items?.map((amenity) => ({
    value: amenity._id,
    label: amenity.name
  }))

  const getCategories = useGetCategories({})

  const categoriesOptions =
    getCategories.data?.items?.map((category) => {
      return {
        value: category._id,
        label: t(
          `shared.fields.propertyCategory.${category?.name.toLowerCase()}`
        )
      }
    }) || []

  const radioGroups = [
    {
      name: 'type',
      label: t('shared.fields.propertyType.label'),
      options: Object.values(SaleTypeEnum).map((option) => ({
        value: option,
        label: t(`shared.fields.propertyType.${option.toLowerCase()}`)
      })),
      required: true
    },
    {
      name: 'category',
      label: t('shared.fields.propertyCategory.label'),
      options: categoriesOptions,
      required: true
    },
    {
      name: 'completion',
      label: t('shared.fields.completion.label'),
      options: Object.values(CompletionEnum).map((option) => ({
        value: option,
        label: t(`shared.fields.completion.${option.toLowerCase()}`)
      })),
      required: true
    }
  ]

  const getSubCategories = useGetSubCategories(
    {
      filter: {
        category: (
          form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
        ).category
      }
    },
    {
      queryKey: [QUERY_KEYS.CATEGORIES],
      enabled:
        (form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA)
          .category?.length > 0 ||
        (form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA)
          .category === undefined
    }
  )

  const subCategoriesOptions =
    getSubCategories.data?.items?.map((subCategory) => ({
      value: subCategory._id,
      label: subCategory.name
    })) || []

  const selectedSubCategoryLabel = subCategoriesOptions?.find(
    (subCategory) =>
      subCategory.value ===
      (form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA)
        ?.subCategory
  )?.label

  const decideReturningInputs = () => {
    if (selectedSubCategoryLabel === 'Studio') {
      return []
    }
    if (selectedSubCategoryLabel === 'Office') {
      return [
        {
          label: t('shared.fields.noOfToilets'),
          name: 'toilets',
          required: false
        }
      ]
    }
    return [
      {
        label: t('shared.fields.noOfLivingRooms'),
        name: 'living',
        required: false
      },
      {
        label: t('shared.fields.noOfToilets'),
        name: 'toilets',
        required: false
      },
      {
        label: t('shared.fields.noOfBedrooms'),
        name: 'bedroom',
        required: false
      }
    ]
  }

  const rangeFields = [
    {
      label: t('shared.fields.area'),
      name: 'area',
      required: false
    },
    {
      label: t('shared.fields.age'),
      name: 'age',
      required: false
    },
    ...decideReturningInputs()
  ]

  return (
    <Flex className='w-full flex-col items-start justify-between gap-6 py-12 md:gap-12 lg:flex-row'>
      <Box id='left' className='w-full space-y-6 lg:w-[65%]'>
        <Group className='items-center justify-between gap-4'>
          {radioGroups.map((group) => (
            <Box key={group.name} className='w-full space-y-2 lg:flex-1'>
              <Text className='text-sm font-bold text-neutral-500'>
                {group.label} {!group.required && `(${t('shared.optional')})`}
              </Text>
              <div className='flex items-center gap-2 capitalize'>
                {group.options.map(
                  (option: { value: string | undefined; label: string }) => (
                    <Fragment key={option?.value || option?.label}>
                      <RadioField
                        label={option?.label}
                        value={option?.value}
                        checked={
                          (form.values as Record<string, string>)[
                            group.name
                          ] === option?.value
                        }
                        onChange={() =>
                          form.setFieldValue(group?.name, option?.value)
                        }
                      />
                    </Fragment>
                  )
                )}
              </div>
              {form.errors[group.name] && (
                <Input.Error>{form.errors[group.name]}</Input.Error>
              )}
            </Box>
          ))}
          {(form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA)
            .type === SaleTypeEnum.Rent && (
            <Radio.Group
              name='duration'
              label={
                <label>
                  <Text
                    component='span'
                    className='text-sm font-bold text-neutral-500'
                  >
                    {t('shared.fields.rentDuration')}
                  </Text>
                </label>
              }
              {...form.getInputProps('price.duration')}
              required={
                (
                  form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                ).type === SaleTypeEnum.Rent
              }
            >
              <Group mt='xs'>
                {Object.values(RentDurationEnum).map((option) => (
                  <Radio
                    color='primary'
                    variant='outline'
                    className='capitalize'
                    key={option}
                    label={option}
                    value={option}
                  />
                ))}
              </Group>
            </Radio.Group>
          )}
        </Group>

        <>
          <Flex className='gap-1'>
            <Text component='span' className='font-bold text-neutral-500'>
              {t('shared.fields.location')}
            </Text>{' '}
            <InputError>*</InputError>
          </Flex>
          <LocationField
            modalTitle={t('shared.placeholders.selectLocation')}
            {...form.getInputProps('location')}
          >
            <Input
              size='md'
              className='!mt-2'
              classNames={{
                input: cn(
                  'w-full rounded-md h-auto bg-default-background border border-neutral-400 focus:border-neutral-300 focus:outline-none'
                )
              }}
              component='button'
              type='button'
              pointer
              rightSection={<CiGps size={20} />}
            >
              <Input.Placeholder
                className={cn({
                  'text-default-text': (
                    form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                  ).location?.address
                })}
              >
                {(
                  form.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                ).location?.address ?? t('shared.placeholders.location')}
              </Input.Placeholder>
            </Input>
          </LocationField>
          <Input.Error>
            {form.errors.location && form.errors.location}
          </Input.Error>
        </>
        <MultiSelectField
          {...form.getInputProps('amenities')}
          label={t('shared.fields.amenities')}
          data={basicAmenitiesOptions}
          placeholder={t('shared.placeholders.amenities')}
          required={false}
          size='md'
          searchable
        />
        <MultiSelectField
          {...form.getInputProps('furnished')}
          label={t('shared.fields.furnishing.label')}
          data={furnishingStatusOptions}
          placeholder={t('shared.placeholders.furnishing')}
          required={false}
          size='md'
          searchable
        />

        {!getSubCategories?.isLoading && (
          <SelectField
            defaultValue={
              (form?.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA)
                ?.subCategory
            }
            disabled={getSubCategories?.isLoading}
            {...form.getInputProps('subCategory')}
            label={t('shared.fields.propertyType.label')}
            data={subCategoriesOptions ?? []}
            placeholder={t('shared.placeholders.choosePropertyType')}
            required
            size='md'
          />
        )}

        <Stack className='gap-0'>
          <RangeField
            showBorder
            wrapperClassName='!bg-default-background rounded-md'
            isDifferentBackground
            className='overflow-hidden rounded-md'
            circleStyle='bg-neutral-100 text-neutral-700'
            inputClassName=' h-full'
            label={t('shared.fields.price')}
            value={
              (
                form?.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
              )?.price?.value
            }
            onChange={(value) => form.setFieldValue('price.value', value)}
            required
          />
          <Input.Error>{form.errors['price.value']}</Input.Error>
        </Stack>
      </Box>

      <Box id='right' className='w-full space-y-2 lg:w-[35%]'>
        {rangeFields.map((field) => (
          <Stack key={field.name} className='gap-0'>
            <RangeField
              showBorder
              wrapperClassName='!bg-default-background rounded-md'
              isDifferentBackground
              className='overflow-hidden rounded-md'
              circleStyle='bg-neutral-100 text-neutral-700'
              inputClassName=' h-full'
              label={field.label}
              value={
                (
                  form?.getValues() as typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                )[
                  field.name as keyof typeof DEFAULT_BUY_PROPERTY_REQUEST_FORM_DATA
                ] as RangeFieldValue
              }
              onChange={(value) => form.setFieldValue(field.name, value)}
              required={field.required}
            />
            <Input.Error>
              {form.errors[field.name]}
              <br />
              {form.errors[`${field.name}.0`] || form.errors[`${field.name}.1`]}
            </Input.Error>
          </Stack>
        ))}
        <PrimaryButton
          fullWidth
          size='lg'
          className='rounded-lg font-semibold text-secondary'
          type='button'
          onClick={onNext}
        >
          {t('shared.buttons.next')}
        </PrimaryButton>
      </Box>
    </Flex>
  )
}

export default PropertyInformation
