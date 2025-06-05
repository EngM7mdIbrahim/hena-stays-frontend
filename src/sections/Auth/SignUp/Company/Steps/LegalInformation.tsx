'use client'

import React from 'react'
import { Authority, Jurisdiction } from '@commonTypes'
import { DEFAULT_COMPANY_SIGNUP_FORM_DATA } from '@constants'
import { CompanySignupFormContext } from '@context'
import { Flex, Input, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import DateField from '@components/CustomFields/DateField'
import SelectField from '@components/CustomFields/SelectField'
import TextField from '@components/CustomFields/TextField'
import UploadField from '@components/CustomFields/UploadField'

const { useCompanySignupFormContext } = CompanySignupFormContext

const businessTypes: string[] = Object.values(Jurisdiction)

const data: Record<string, string[]> = {
  [Jurisdiction.Mainland]: Object.values(Authority).slice(0, 8),
  [Jurisdiction.Freezone]: Object.values(Authority).slice(8)
}

const cities = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ras Al Khaimah',
  'Ajman',
  'Fujairah',
  'Umm Al Quwain'
]

export interface LegalInformationProps {
  loading: boolean
  buttonText?: string
}

function LegalInformation({
  loading,
  buttonText = 'Sign Up'
}: LegalInformationProps) {
  const t = useTranslations()
  const form = useCompanySignupFormContext()
  const { jurisdiction } =
    form.values as typeof DEFAULT_COMPANY_SIGNUP_FORM_DATA

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
      <SelectField
        {...form.getInputProps('jurisdiction')}
        label={t('auth.signup.signupCompany.fields.businessJurisdictionType')}
        data={businessTypes}
        placeholder={t(
          'auth.signup.signupCompany.placeholders.businessJurisdictionType'
        )}
        required
        size='md'
      />

      <SelectField
        {...form.getInputProps('authority')}
        label={t('auth.signup.signupCompany.fields.licenseAuthority')}
        data={data[jurisdiction] ?? []}
        placeholder={t(
          'auth.signup.signupCompany.placeholders.licenseAuthority'
        )}
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
        <Flex className='gap-1'>
          <Text component='span' className='text-sm font-bold text-neutral-500'>
            {t('auth.signup.shared.legalInformation.fields.licenseCopies')}
          </Text>{' '}
          <Input.Error>*</Input.Error>
        </Flex>

        <UploadField
          multiple
          required
          {...form.getInputProps('licenseCopies')}
          placeholder={t(
            'auth.signup.shared.legalInformation.placeholders.licenseCopies'
          )}
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
