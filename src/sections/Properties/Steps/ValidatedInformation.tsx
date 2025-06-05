import React from 'react'
import { OwnerShipEnum } from '@commonTypes'
import { PropertyFormContext } from '@context'
import { Button, Flex, Group, Radio, Stack, Text } from '@mantine/core'
import { BasicInformationProps } from '@sections/Auth/SignUp/Company/Steps/BasicInformation'
import { DetailsProps } from '@sections/Blog/Steps/Details'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import NumberField from '@components/CustomFields/NumberField'
import TextField from '@components/CustomFields/TextField'

const { usePropertyFormContext } = PropertyFormContext

function ValidatedInformation({
  onNext,
  onBack
}: BasicInformationProps & DetailsProps) {
  const form = usePropertyFormContext()
  const t = useTranslations()
  const radioGroups = [
    {
      name: 'ownership',
      value: OwnerShipEnum.Individual,
      label: t(
        'properties.propertyForm.validatedInformation.fields.ownership.individual'
      )
    },

    {
      name: 'ownership',
      value: OwnerShipEnum.Company,
      label: t(
        'properties.propertyForm.validatedInformation.fields.ownership.company'
      )
    }
  ]

  return (
    <Stack className='gap-6 py-12'>
      <TextField
        {...form.getInputProps('developer')}
        placeholder={t(
          'properties.propertyForm.validatedInformation.fields.placeholders.developer'
        )}
        label={t(
          'properties.propertyForm.validatedInformation.fields.developer'
        )}
        type='text'
        required={false}
        size='md'
      />

      <Flex className='flex-col md:flex-row' gap='md'>
        <NumberField
          {...form.getInputProps('area.plot')}
          placeholder={t(
            'properties.propertyForm.validatedInformation.fields.placeholders.plot'
          )}
          label={t('properties.propertyForm.validatedInformation.fields.plot')}
          hideControls
          required={false}
          size='md'
          className='w-full md:flex-1'
        />
        <NumberField
          {...form.getInputProps('area.builtIn')}
          placeholder={t(
            'properties.propertyForm.validatedInformation.fields.placeholders.builtIn'
          )}
          label={t(
            'properties.propertyForm.validatedInformation.fields.builtIn'
          )}
          hideControls
          required={false}
          size='md'
          className='w-full md:flex-1'
        />
      </Flex>
      <Radio.Group
        name='ownership'
        label={
          <label>
            <Text
              component='span'
              className='text-sm font-bold text-neutral-500'
            >
              {t(
                'properties.propertyForm.validatedInformation.fields.ownership.label'
              )}{' '}
              ({t('shared.optional')})
            </Text>
          </label>
        }
        {...form.getInputProps('ownership')}
        required={false}
      >
        <Group mt='xs'>
          {radioGroups.map((option) => (
            <Radio
              variant='outline'
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Group>
      </Radio.Group>
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

export default ValidatedInformation
