import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  DEFAULT_USER_SIGNUP_FORM_DATA,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { Modules } from '@enums'
import { Box, Button, Flex, Input, Stack } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { REQUEST_PROPERTY_LANDING_FORM_SCHEMA } from '@schemas/buy-property-requests/requestPropertyLandingForm'
import { useTranslations } from 'next-intl'

import { useQuickRegister } from '@hooks/query/auth/useQuickRegister'
import { useGetUserPermissions } from '@hooks/useGetUserPermissions'
import { useLinkConstructor } from '@hooks/useLinkConstructor'
import { useUser } from '@hooks/useUser'
import CheckboxField from '@components/CustomFields/CheckboxField'
import PhoneNumberField from '@components/CustomFields/PhoneNumberField'
import TextField from '@components/CustomFields/TextField'
import { appNotifications, cn, transformData } from '@utils'

function RequestPropertyLanding() {
  const t = useTranslations()
  const { user, permissions } = useGetUserPermissions(
    Modules.BUY_PROPERTY_REQUESTS
  )
  const { canAddBuyPropertyRequest } = permissions
  const { login } = useUser()
  const router = useRouter()
  const { constructLink } = useLinkConstructor()
  const { name, email, phone, whatsapp, sameAsWhatsapp } =
    DEFAULT_USER_SIGNUP_FORM_DATA
  const form = useForm({
    initialValues: {
      name,
      email,
      phone,
      whatsapp,
      sameAsWhatsapp
    },
    validate: zodResolver(REQUEST_PROPERTY_LANDING_FORM_SCHEMA(t)),
    mode: 'controlled'
  })

  useEffect(() => {
    if (user?._id) {
      const sameAsWhatsappCheck = user?.phone === user?.whatsapp
      form.setFieldValue('name', user?.name)
      form.setFieldValue('email', user?.email)
      form.setFieldValue('sameAsWhatsapp', sameAsWhatsappCheck)
      form.setFieldValue('phone', user?.phone)
      form.setFieldValue(
        'whatsapp',
        sameAsWhatsappCheck ? user?.phone : user?.whatsapp
      )
    }
  }, [user])

  const quickRegister = useQuickRegister({
    onSuccess: ({ token, user: newUser }) => {
      login(token, newUser)
      appNotifications.success('User created successfully')
      router.push(navigationLinks.buyPropertyRequests.addBuyPropertyRequests)
    }
  })

  const handleSubmit = (data: typeof DEFAULT_USER_SIGNUP_FORM_DATA) => {
    if (!canAddBuyPropertyRequest) {
      appNotifications.error(
        'You are a partner not a normal user, to use this feature'
      )
    } else {
      form.validate()
      if (!form.isValid()) return
      const transformedData = transformData(
        REQUEST_PROPERTY_LANDING_FORM_SCHEMA(t),
        data
      )
      if (transformedData) {
        if (user?._id) {
          router.push(
            constructLink(
              navigationLinks.buyPropertyRequests.addBuyPropertyRequests,
              {
                [SEARCH_PARAM_KEYS.USER_KEY]: JSON.stringify(transformedData)
              }
            )
          )
        } else {
          quickRegister.mutate(
            transformedData as typeof DEFAULT_USER_SIGNUP_FORM_DATA
          )
        }
      }
    }
  }

  return (
    <Box className={cn('relative z-20 lg:w-[75%]')}>
      {/* Box Content */}
      <form
        onSubmit={form.onSubmit((data) =>
          handleSubmit(data as typeof DEFAULT_USER_SIGNUP_FORM_DATA)
        )}
        className='rounded-2xl rounded-tl-none border border-neutral-border bg-gradient-to-br from-default-background to-default-background/35 p-6 backdrop-blur-md'
      >
        <Flex className='flex-col md:flex-row' gap='md'>
          <TextField
            withAsterisk
            {...form.getInputProps('name')}
            placeholder={t('shared.placeholders.fullName')}
            label={t('shared.fields.fullName')}
            type='text'
            required
            size='md'
          />
          <TextField
            {...form.getInputProps('email')}
            placeholder={t('shared.placeholders.email')}
            label={t('shared.fields.email')}
            type='email'
            required
            size='md'
          />
        </Flex>
        <Stack mt='md'>
          <Stack gap={2}>
            <PhoneNumberField
              required
              label={t('shared.fields.phoneNumber')}
              {...form.getInputProps('phone')}
            />
            {form.errors.phone && (
              <Input.Error>{form.errors.phone}</Input.Error>
            )}
          </Stack>
          {!form.values.sameAsWhatsapp && (
            <Stack gap={2}>
              <PhoneNumberField
                required
                label={t('shared.fields.whatsappNumber')}
                {...form.getInputProps('whatsapp')}
              />
              {form.errors.whatsapp && (
                <Input.Error>{form.errors.whatsapp}</Input.Error>
              )}
            </Stack>
          )}

          <CheckboxField
            {...form.getInputProps('sameAsWhatsapp')}
            checked={form.values.sameAsWhatsapp}
            value='sameAsWhatsapp'
            label={t('shared.fields.sameAsWhatsapp')}
          />
        </Stack>
        <Button
          loading={quickRegister.isPending}
          variant='gradient'
          gradient={{ from: '#F6A649', to: '#90612B', deg: 270 }}
          type='submit'
          fullWidth
          mt='md'
          size='lg'
          className='rounded-lg font-semibold text-white'
        >
          {t('shared.buttons.next')}
        </Button>
      </form>
    </Box>
  )
}

export default RequestPropertyLanding
