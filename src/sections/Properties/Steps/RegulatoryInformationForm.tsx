import React from 'react'
import { DEFAULT_PROPERTY_FORM_DATA } from '@constants'
import { PropertyFormContext } from '@context'
import { Box, Button, Checkbox, Flex, Group, Stack, Text } from '@mantine/core'
import { DetailsProps } from '@sections/Blog/Steps/Details'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import TextField from '@components/CustomFields/TextField'
import UploadFile from '@components/UploadFile'

const { usePropertyFormContext } = PropertyFormContext

function RegulatoryInformationForm({ onBack, loading }: DetailsProps) {
  const form = usePropertyFormContext()
  const t = useTranslations()

  return (
    <Stack className='gap-6 py-12'>
      <Box className='space-y-2'>
        {(form.values as typeof DEFAULT_PROPERTY_FORM_DATA).location.city
          .toLowerCase()
          .includes('dubai') && (
          <>
            <UploadFile
              placeholder={t(
                'properties.propertyForm.regulatoryInformation.placeholders.tarkheesi'
              )}
              file={
                (form.getValues() as typeof DEFAULT_PROPERTY_FORM_DATA).permit
                  .tarkheesi
              }
              onFileChange={(file) =>
                form.setFieldValue('permit.tarkheesi', file)
              }
            />
            {form?.errors?.['permit.tarkheesi'] && (
              <Text size='sm' className='w-full' c='red'>
                {form?.errors?.['permit.tarkheesi']}
              </Text>
            )}
          </>
        )}
      </Box>

      <Flex className='flex-col md:flex-row' gap='md'>
        <TextField
          {...form.getInputProps('permit.number')}
          placeholder={t(
            'properties.propertyForm.regulatoryInformation.placeholders.example'
          )}
          label={t(
            'properties.propertyForm.regulatoryInformation.fields.dldPermitNumber'
          )}
          required
          size='md'
        />
        <TextField
          {...form.getInputProps('permit.DED')}
          placeholder={t(
            'properties.propertyForm.regulatoryInformation.placeholders.example'
          )}
          label={t('properties.propertyForm.regulatoryInformation.fields.ded')}
          required={false}
          size='md'
        />
      </Flex>

      <Flex className='flex-col md:flex-row' gap='md'>
        <TextField
          {...form.getInputProps('permit.RERA')}
          placeholder={t(
            'properties.propertyForm.regulatoryInformation.placeholders.example'
          )}
          label={t('properties.propertyForm.regulatoryInformation.fields.rera')}
          required={false}
          size='md'
        />
        <TextField
          {...form.getInputProps('permit.BRN')}
          placeholder={t(
            'properties.propertyForm.regulatoryInformation.placeholders.example'
          )}
          label={t('properties.propertyForm.regulatoryInformation.fields.brn')}
          required
          size='md'
        />
      </Flex>

      <Checkbox
        classNames={{
          root: 'flex items-center'
        }}
        size='md'
        {...form.getInputProps('isRegulated')}
        label={
          /* TODO: link later in contact us */
          <Text className='text-neutral-500'>
            {t(
              'properties.propertyForm.regulatoryInformation.confirmationText'
            )}
            <Text
              component='span'
              className='font-semibold text-primary underline hover:no-underline'
            >
              {t('properties.propertyForm.regulatoryInformation.contactUs')}
            </Text>
          </Text>
        }
      />
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
          loading={loading}
          type='submit'
          size='lg'
          className='w-full rounded-lg font-semibold text-secondary md:flex-1'
        >
          {(form.getValues() as { _id: string })?._id
            ? t('shared.buttons.update')
            : t('shared.buttons.add')}
        </PrimaryButton>
      </Group>
    </Stack>
  )
}

export default RegulatoryInformationForm
