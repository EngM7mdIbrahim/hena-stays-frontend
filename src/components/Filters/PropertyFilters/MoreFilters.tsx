'use client'

import { useState } from 'react'
import { FurnishedEnum, GetAllPropertiesQuery } from '@commonTypes'
import { isNonZeroNumber } from '@guards'
import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { isNumber } from '@tiptap/react'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import NumberField from '@components/CustomFields/NumberField'
import SearchField from '@components/CustomFields/SearchField'
import SelectField from '@components/CustomFields/SelectField'

interface MoreFiltersFormState {
  beds: string | number
  baths: string | number
  minArea: string | number
  maxArea: string | number
  furnished: string
  text: string
}

export interface MoreFiltersProps {
  filters: Pick<GetAllPropertiesQuery, 'filter' | 'text'>
  onFiltersChange: (
    filters: Pick<GetAllPropertiesQuery, 'filter' | 'text'>
  ) => void
  onClose: () => void
  onReset: () => void
}

function MoreFilters({
  filters,
  onFiltersChange,
  onClose,
  onReset
}: MoreFiltersProps) {
  const t = useTranslations()
  const furnishing = Object.values(FurnishedEnum).map((option) => ({
    value: option,
    label: t(`shared.fields.furnishing.${option.toLowerCase()}`)
  }))

  const [formState, setFormState] = useState<MoreFiltersFormState>({
    beds: filters.filter?.bedroom || '',
    baths: filters.filter?.toilets || '',
    minArea: filters.filter?.area?.plot?.min || '',
    maxArea: filters.filter?.area?.plot?.max || '',
    furnished: filters.filter?.furnished || '',
    text: filters.text || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFiltersChange({
      text: formState.text,
      filter: {
        ...filters.filter,
        ...(formState.beds !== '' && { bedroom: `${formState.beds}` }),
        ...(formState.baths !== '' && { toilets: `${formState.baths}` }),
        ...((isNonZeroNumber(formState.maxArea) ||
          isNonZeroNumber(formState.minArea)) && {
          area: {
            plot: {
              ...(isNonZeroNumber(formState.minArea) && {
                min: formState.minArea
              }),
              ...(isNonZeroNumber(formState.maxArea) && {
                max: formState.maxArea
              })
            }
          }
        }),
        ...(formState.furnished !== '' && { furnished: formState.furnished })
      }
    })
    onClose()
  }

  const handleReset = () => {
    setFormState({
      beds: '',
      baths: '',
      minArea: '',
      maxArea: '',
      furnished: '',
      text: ''
    })
    onReset()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <Box className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <NumberField
          value={formState.beds}
          onChange={(val) =>
            setFormState((prev) => ({
              ...prev,
              ...(isNumber(val) ? { beds: val } : {})
            }))
          }
          showOptional={false}
          hideControls
          format={false}
          placeholder='0'
          size='lg'
          label={t('properties.filters.numberOfBeds')}
          className='border-neutral100'
        />
        <NumberField
          value={formState.baths}
          onChange={(val) =>
            setFormState((prev) => ({
              ...prev,
              ...(isNumber(val) ? { baths: val } : {})
            }))
          }
          showOptional={false}
          hideControls
          format={false}
          placeholder='0'
          label={t('properties.filters.numberOfBaths')}
          size='lg'
          className='border-neutral100'
        />
      </Box>
      <Stack>
        <Text>{t('properties.filters.area')}</Text>
        <Box className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <NumberField
            value={formState.minArea}
            onChange={(val) =>
              setFormState((prev) => ({
                ...prev,
                ...(isNonZeroNumber(val) ? { minArea: val } : {})
              }))
            }
            showOptional={false}
            hideControls
            format={false}
            placeholder='0'
            label={t('properties.filters.minimum')}
            size='lg'
            className='border-neutral100'
          />
          <NumberField
            value={formState.maxArea}
            onChange={(val) =>
              setFormState((prev) => ({
                ...prev,
                ...(isNonZeroNumber(val) ? { maxArea: val } : {})
              }))
            }
            showOptional={false}
            hideControls
            size='lg'
            format={false}
            placeholder={t('properties.filters.any')}
            label={t('properties.filters.maximum')}
            className='border-neutral100'
          />
        </Box>
      </Stack>
      <Stack>
        <Text>{t('properties.filters.keywords')}</Text>

        <SearchField
          size='lg'
          className='w-full rounded-md bg-transparent outline-none'
          placeholder={t('properties.filters.keywords')}
          value={formState.text || ''}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              ...(e.target.value ? { text: e.target.value } : {})
            }))
          }
        />
      </Stack>
      <SelectField
        value={formState.furnished}
        onChange={(val) =>
          setFormState((prev) => ({
            ...prev,
            ...(val ? { furnished: val } : {})
          }))
        }
        className='border-neutral100'
        size='lg'
        placeholder={t('shared.fields.furnishing.label')}
        data={furnishing}
      />

      <Group>
        <Button
          onClick={handleReset}
          type='button'
          variant='light'
          color='gray'
          className='w-full rounded-lg font-semibold text-primary md:flex-1'
          size='lg'
        >
          {t('shared.buttons.reset')}
        </Button>
        <PrimaryButton
          type='submit'
          size='lg'
          className='w-full rounded-lg font-semibold text-secondary md:flex-1'
        >
          {t('shared.buttons.done')}
        </PrimaryButton>
      </Group>
    </form>
  )
}

export default MoreFilters
