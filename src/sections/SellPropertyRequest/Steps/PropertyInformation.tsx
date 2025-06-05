import React, { Fragment } from 'react'
import {
  CompletionEnum,
  FurnishedEnum,
  RentDurationEnum,
  SaleTypeEnum
} from '@commonTypes'
import { DEFAULT_PROPERTY_FORM_DATA, QUERY_KEYS } from '@constants'
import { SellPropertyRequestFormContext } from '@context'
import { useGetCategories, useGetSubCategories } from '@hooks'
import { Box, Flex, Group, Input, Radio, Text } from '@mantine/core'
import { BasicInformationProps } from '@sections/Auth/SignUp/Agent/Steps/BasicInformation'
import { useTranslations } from 'next-intl'
import { CiGps } from 'react-icons/ci'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import LocationField from '@components/CustomFields/LocationField'
import NumberField from '@components/CustomFields/NumberField'
import RadioField from '@components/CustomFields/RadioField'
import SelectField from '@components/CustomFields/SelectField'
import TextareaField from '@components/CustomFields/TextareaField'
import TextField from '@components/CustomFields/TextField'
import { cn } from '@utils'

const { useSellPropertyRequestFormContext } = SellPropertyRequestFormContext

function PropertyInformation({ onNext }: BasicInformationProps) {
  const t = useTranslations()
  const form = useSellPropertyRequestFormContext()

  const furnishingStatusOptions = Object.values(FurnishedEnum).map(
    (option) => ({
      value: option,
      label: t(`shared.fields.furnishing.${option}`)
    })
  )

  const numberFields = [
    {
      name: 'bedroom',
      label: t('shared.fields.noOfBedrooms'),
      placeholder: t('shared.placeholders.noOfBedrooms'),
      required: false
    },
    {
      name: 'toilets',
      label: t('shared.fields.noOfToilets'),
      placeholder: t('shared.placeholders.noOfToilets'),
      required: false
    },
    {
      name: 'living',
      label: t('shared.fields.noOfLivingRooms'),
      placeholder: t('shared.placeholders.noOfLivingRooms'),
      required: false
    },
    {
      name: 'floor',
      label: t('shared.fields.floor'),
      placeholder: t('shared.placeholders.yourFloorNumber'),
      required: false
    },
    {
      name: 'floors',
      label: t('shared.fields.noOfFloors'),
      placeholder: t('shared.placeholders.noOfFloors'),
      required: false
    },
    {
      name: 'age',
      label: t('shared.fields.age'),
      placeholder: t('shared.placeholders.propertyEstimatedAge'),
      required: false
    }
  ]

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

  const getSubCategories = useGetSubCategories(
    {
      filter: {
        category: (form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA)
          .category
      }
    },
    {
      queryKey: [QUERY_KEYS.CATEGORIES],
      enabled: !!(form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA)
        .category
    }
  )

  const subCategoriesOptions =
    getSubCategories.data?.items?.map((subCategory) => ({
      value: subCategory._id,
      label: subCategory.name
    })) || []

  const radioGroups = [
    {
      name: 'type',
      label: t('shared.fields.propertyType.label'),
      options: Object.values(SaleTypeEnum).map((option) => {
        return {
          value: option,
          label: t(`shared.fields.propertyType.${option.toLowerCase()}`)
        }
      }),
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
      options: Object.values(CompletionEnum).map((option) => {
        return {
          value: option,
          label: t(`shared.fields.completion.${option.toLowerCase()}`)
        }
      }),
      required: true
    }
  ]

  return (
    <Flex className='w-full flex-col items-start justify-between gap-12 py-12 lg:flex-row'>
      <Box id='left' className='w-full space-y-6 lg:w-[65%]'>
        <Group className='items-center justify-between gap-4'>
          {radioGroups.map((group) => (
            <Box key={group.name} className='w-full space-y-2 lg:flex-1'>
              <Text className='text-sm font-bold text-neutral-500'>
                {group.label} {!group.required && `(${t('shared.optional')})`}
              </Text>
              <div className='flex items-center gap-2 capitalize'>
                {group.options.map(
                  (option: { value: string; label: string }) => (
                    <Fragment key={option?.value}>
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
        </Group>
        {(form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA).type ===
          SaleTypeEnum.Rent && (
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
            required={false}
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
        <TextField
          {...form.getInputProps('title')}
          label={t('shared.fields.title')}
          placeholder={t('shared.placeholders.propertyTitle')}
          required
          size='md'
          type='text'
        />
        <TextareaField
          {...form.getInputProps('description')}
          label={t('shared.fields.description')}
          placeholder={t('shared.placeholders.propertyDescription')}
          required
          size='md'
          className='min-h-[150px]'
        />
        <>
          <Flex className='gap-1'>
            <Text component='span' className='font-bold text-neutral-500'>
              {t('shared.fields.location')}
            </Text>{' '}
            <Input.Error>*</Input.Error>
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
                  'w-full rounded-md h-auto border bg-default-background border-neutral-400 focus:border-neutral-300 focus:outline-none'
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
                    form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA
                  ).location?.address
                })}
              >
                {(form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA)
                  .location?.address ?? t('shared.placeholders.location')}
              </Input.Placeholder>
            </Input>
          </LocationField>
          <Input.Error>
            {form.errors.location && form.errors.location}
          </Input.Error>
        </>

        {!getSubCategories?.isLoading && (
          <SelectField
            defaultValue={
              (form?.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA)
                ?.subCategory
            }
            disabled={getSubCategories?.isLoading}
            {...form.getInputProps('subCategory')}
            label={t('shared.fields.subCategory')}
            data={subCategoriesOptions ?? []}
            placeholder={t('shared.placeholders.choosePropertyType')}
            required
            size='md'
          />
        )}

        <NumberField
          hideControls
          {...form.getInputProps('price.value')}
          label={t('shared.fields.price')}
          placeholder={t('shared.placeholders.priceInAED')}
          required
          size='md'
        />
        <Radio.Group
          name='furnished'
          label={
            <label>
              <Text
                component='span'
                className='text-sm font-bold text-neutral-500'
              >
                {t('shared.fields.furnishing.label')} ({t('shared.optional')})
              </Text>
            </label>
          }
          {...form.getInputProps('furnished')}
          required={false}
        >
          <Group mt='xs'>
            {furnishingStatusOptions.map(
              (option: { value: string; label: string }) => (
                <Radio
                  color='blue.8'
                  variant='outline'
                  className='capitalize'
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              )
            )}
          </Group>
        </Radio.Group>
      </Box>

      <Box id='right' className='w-full space-y-4 lg:w-[35%]'>
        {numberFields.map((field) => (
          <NumberField
            key={field.name}
            {...form.getInputProps(field.name)}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            size='md'
          />
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
