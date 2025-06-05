'use client'

import React, { useEffect } from 'react'
import { DEFAULT_CONFIG_FORM_DATA } from '@constants'
import { useGetConfig, useUpdateConfig } from '@hooks'
import { Box, Button, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import { CONFIG_FORM_SCHEMA } from '@schemas/config/configForm'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import NumberField from '@components/CustomFields/NumberField'
import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'
import AppModal from '@components/Modals/AppModal'
import { appNotifications } from '@utils'

export interface ConfigModalProps {
  openConfigModal: boolean
  setOpenConfigModal: React.Dispatch<React.SetStateAction<boolean>>
}

function ConfigModal({
  openConfigModal,
  setOpenConfigModal
}: ConfigModalProps) {
  const t = useTranslations()
  const { data, isLoading, isError, error } = useGetConfig()

  const config = data?.config

  const {
    getInputProps,
    values,
    insertListItem,
    removeListItem,
    setValues,
    onSubmit
  } = useForm({
    initialValues: DEFAULT_CONFIG_FORM_DATA,
    validate: zodResolver(CONFIG_FORM_SCHEMA(t))
  })

  useEffect(() => {
    if (config) {
      setValues({
        propertyRecommendations: {
          hot: config.propertyRecommendations.hot.map((item) => ({
            ...item,
            key: randomId()
          })),
          propertyOfWeek: config.propertyRecommendations.propertyOfWeek.map(
            (item) => ({
              ...item,
              key: randomId()
            })
          ),
          signature: config.propertyRecommendations.signature.map((item) => ({
            ...item,
            key: randomId()
          }))
        }
      })
    }
  }, [config])

  const { mutate: updateConfig, isPending } = useUpdateConfig({
    onSuccess: () => {
      setOpenConfigModal(false)
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('config.title')
        })
      )
    }
  })

  const handleAppend = (recommendationKey: string) => {
    insertListItem(`propertyRecommendations.${recommendationKey}`, {
      price: 0,
      noExpireDays: 0,
      key: randomId()
    })
  }

  const handleRemove = (index: number, recommendationKey: string) => {
    removeListItem(`propertyRecommendations.${recommendationKey}`, index)
  }

  const renderFieldArray = (
    fields: (typeof DEFAULT_CONFIG_FORM_DATA)['propertyRecommendations'][keyof (typeof DEFAULT_CONFIG_FORM_DATA)['propertyRecommendations']],
    append: () => void,
    remove: (index: number) => void,
    mainTitle: string
  ) => {
    let title = ''

    switch (mainTitle) {
      case 'hot':
        title = t('homePage.recommendedProperties.hotDeals')
        break
      case 'propertyOfWeek':
        title = t('homePage.recommendedProperties.propertyOfTheWeek')
        break
      case 'signature':
        title = t('homePage.recommendedProperties.signatures')
        break
      default:
        title = ''
    }

    return (
      <Box className='mb-4'>
        <Text component='h3' className='mb-4 font-semibold capitalize'>
          {title}
        </Text>
        {fields.map((field, index: number) => (
          <Box
            key={field.key}
            className='mb-2 flex flex-col items-center justify-center gap-4 pb-2 md:flex-row'
          >
            <NumberField
              label={t('config.price')}
              showOptional={false}
              {...getInputProps(
                `propertyRecommendations.${mainTitle}.${index}.price`
              )}
              min={0}
              placeholder={t('config.price')}
              radius='xl'
            />

            <NumberField
              label={t('config.noOfExpiryDays')}
              showOptional={false}
              {...getInputProps(
                `propertyRecommendations.${mainTitle}.${index}.noExpireDays`
              )}
              min={0}
              placeholder={t('config.noOfExpiryDays')}
              radius='xl'
            />

            {fields.length > 1 && (
              <button
                type='button'
                onClick={() => remove(index)}
                className='self-end text-error-500'
              >
                {t('config.remove')}
              </button>
            )}
            {fields.length === 1 && (
              <button
                type='button'
                onClick={append}
                className='mt-2 self-end rounded-full bg-blue-500 px-3 py-1 text-white'
              >
                +
              </button>
            )}
          </Box>
        ))}
        {fields.length > 1 && (
          <button
            type='button'
            onClick={() => handleAppend(mainTitle)}
            className='mt-2 rounded-full bg-blue-500 px-3 py-1 text-white'
          >
            +
          </button>
        )}
      </Box>
    )
  }

  const handleSubmit = (formValues: typeof DEFAULT_CONFIG_FORM_DATA) => {
    updateConfig(formValues)
  }
  let content = null

  if (isError && error) content = <FullScreenError error={error} />
  if (isLoading) content = <LoaderScreen />

  return (
    <AppModal
      size='lg'
      title={t('config.title')}
      open={openConfigModal}
      setOpen={setOpenConfigModal}
    >
      {content}
      {!isError && !isLoading && (
        <form onSubmit={onSubmit(handleSubmit)} className='flex flex-col gap-4'>
          {renderFieldArray(
            values.propertyRecommendations.hot,
            () => handleAppend('hot'),
            (index) => handleRemove(index, 'hot'),
            'hot'
          )}
          {renderFieldArray(
            values.propertyRecommendations.propertyOfWeek,
            () => handleAppend('propertyOfWeek'),
            (index: number) => handleRemove(index, 'propertyOfWeek'),
            'propertyOfWeek'
          )}
          {renderFieldArray(
            values.propertyRecommendations.signature,
            () => handleAppend('signature'),
            (index) => handleRemove(index, 'signature'),
            'signature'
          )}

          <Box className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Button
              onClick={() => setOpenConfigModal(false)}
              type='button'
              variant='light'
              color='gray'
              className='w-full rounded-lg font-semibold text-primary'
              size='lg'
            >
              {t('shared.buttons.cancel')}
            </Button>
            <PrimaryButton
              loading={isPending}
              type='submit'
              size='lg'
              className='w-full rounded-lg font-semibold text-secondary'
            >
              {t('shared.buttons.update')}
            </PrimaryButton>
          </Box>
        </form>
      )}
    </AppModal>
  )
}

export default ConfigModal
