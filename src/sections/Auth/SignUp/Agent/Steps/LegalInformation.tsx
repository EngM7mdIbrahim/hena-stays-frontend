'use client'

import React from 'react'
import { AgentSignupFormContext } from '@context'
import { Box, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import DateField from '@components/CustomFields/DateField'
import SelectField from '@components/CustomFields/SelectField'
import TextField from '@components/CustomFields/TextField'
import UploadField from '@components/CustomFields/UploadField'

import { LegalInformationProps } from '../../Company/Steps/LegalInformation'

const { useAgentSignupFormContext } = AgentSignupFormContext

const cities = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ras Al Khaimah',
  'Ajman',
  'Fujairah',
  'Umm Al Quwain'
]

function LegalInformation({
  loading,
  buttonText = 'Sign Up'
}: LegalInformationProps) {
  const t = useTranslations()
  const form = useAgentSignupFormContext()

  return (
    <Stack>
      <SelectField
        {...form.getInputProps('city')}
        label={t('auth.signup.signupCompany.fields.licensedCity')}
        data={cities}
        placeholder={t('auth.signup.signupCompany.placeholders.licensedCity')}
        required
        size='md'
      />
      <TextField
        type='text'
        {...form.getInputProps('license')}
        required
        label={t('auth.signup.signupCompany.fields.brokerCardNumber')}
        placeholder={t(
          'auth.signup.signupCompany.placeholders.brokerCardNumber'
        )}
        size='md'
      />

      <DateField
        label={t('auth.signup.signupCompany.fields.licenseExpiryDate')}
        required
        {...form.getInputProps('licenseExpiryDate')}
        placeholder={t(
          'auth.signup.signupCompany.placeholders.licenseExpiryDate'
        )}
        size='md'
      />
      <Stack gap={2}>
        <Box>
          <Text
            component='span'
            className='space-x-1 text-sm font-bold text-neutral-500'
          >
            {t('auth.signup.signupAgent.fields.brokerCard')}
          </Text>
          <Text component='span' className='text-red-500'>
            *
          </Text>
        </Box>

        <UploadField
          multiple
          required
          {...form.getInputProps('licenseCopies')}
          placeholder={t('auth.signup.signupAgent.placeholders.brokerCard')}
        />
        <Text component='p' className='text-xs font-semibold text-neutral-500'>
          {t('auth.signup.shared.legalInformation.uploadType')}
        </Text>
      </Stack>
      <Stack gap={2}>
        <Text component='span' className='text-sm font-bold text-neutral-500'>
          {t('auth.signup.shared.legalInformation.fields.watermark')} (
          {t('shared.optional')})
        </Text>

        <UploadField
          multiple={false}
          {...form.getInputProps('watermark')}
          placeholder={t(
            'auth.signup.shared.legalInformation.placeholders.watermark'
          )}
        />

        <Text component='p' className='text-xs font-semibold text-neutral-500'>
          {t('auth.signup.shared.legalInformation.uploadType')}
        </Text>
      </Stack>
      <PrimaryButton
        loading={loading}
        type='submit'
        size='lg'
        className='mt-4 w-full rounded-md bg-primary px-6 py-3 font-semibold text-secondary'
      >
        {buttonText}
      </PrimaryButton>
    </Stack>
  )
}

export default LegalInformation
