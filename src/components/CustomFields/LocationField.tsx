'use client'

import React, { useState } from 'react'
import { Location } from '@commonTypes'
import { DEFAULT_MAP_POSITION } from '@constants'
import { useSearchPlaces } from '@hooks'
import { Button, Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'

import AppModal from '@components/Modals/AppModal'

import Map from '../Map'
import { DynamicAutoComplete } from './DynamicAutoComplete'

export interface LocationFieldProps {
  value?: Location
  onChange: (location: Location) => void
  modalTitle?: string
  children: React.ReactElement
}

export default function LocationField({
  modalTitle,
  value,
  onChange,
  children: trigger
}: LocationFieldProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslations()
  const { mutateAsync: searchPlaces } = useSearchPlaces()

  return (
    <AppModal
      open={open}
      setOpen={setOpen}
      size='lg'
      title={modalTitle ?? t('shared.placeholders.selectLocation')}
      trigger={trigger}
    >
      <Flex direction='column' gap='md'>
        <DynamicAutoComplete
          className='relative z-40'
          placeholder={
            value?.address ?? t('shared.placeholders.searchByLocation')
          }
          data={async (text) => {
            if (text.trim().length >= 3) {
              const data = await searchPlaces({ text })
              return data.places.map((place) => ({
                value: place,
                label: place.name
              }))
            }
            return []
          }}
          onOptionSelect={(location) => {
            onChange(location ?? DEFAULT_MAP_POSITION)
          }}
        />
        <Map
          className='h-[400px]'
          initialPosition={value}
          onPositionChange={onChange}
        />
        <Button
          disabled={false}
          loading={false}
          onClick={() => {
            setOpen(false)
          }}
          className='mt-5'
        >
          {t('shared.buttons.done')}
        </Button>
      </Flex>
    </AppModal>
  )
}
