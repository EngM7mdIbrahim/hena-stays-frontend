'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  MediaTypes,
  UpdateUserRequestBody,
  UserRole,
  UserRoleType
} from '@commonTypes'
import { DEFAULT_EMPLOYEE_FORM_DATA, navigationLinks } from '@constants'
import { useDeleteMe, useUpdateMe, useUploadImages, useUser } from '@hooks'
import {
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Input,
  Radio,
  SimpleGrid,
  Stack,
  Text
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { EMPLOYEE_FORM_SCHEMA_WITH_REFINE } from '@schemas/users'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale, useTranslations } from 'next-intl'
import { CiBellOn, CiGlobe } from 'react-icons/ci'
import { FaCoins } from 'react-icons/fa'
import { IoTrashOutline } from 'react-icons/io5'

import { useGetMySubscription } from '@hooks/query/subscriptions/useGetMySubscription'
import { useGetMe } from '@hooks/query/users/me/useGetMe'
import AppSwitch from '@components/AppSwitch'
import CheckboxField from '@components/CustomFields/CheckboxField'
import PasswordField from '@components/CustomFields/PasswordField'
import PhoneNumberField from '@components/CustomFields/PhoneNumberField'
import TextareaField from '@components/CustomFields/TextareaField'
import TextField from '@components/CustomFields/TextField'
import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'
import DeleteModal from '@components/Modals/DeleteModal'
import UploadUserImage from '@components/UploadUserImage'
import {
  appNotifications,
  transformData,
  uploadImage,
  userRoleMap
} from '@utils'

function SettingsSection() {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { login, token, logout, setToken } = useUser()
  const { data: subscriptionData, isLoading: subscriptionLoading } =
    useGetMySubscription()
  const { data, isLoading, isError, error, refetch, isSuccess } = useGetMe()
  const form = useForm({
    mode: 'controlled',
    initialValues: DEFAULT_EMPLOYEE_FORM_DATA,
    validate: zodResolver(EMPLOYEE_FORM_SCHEMA_WITH_REFINE(t))
  })

  useEffect(() => {
    if (data && data.user) {
      form.setValues({
        ...data.user,
        isEdit: true,
        sameAsWhatsapp: data?.user?.whatsapp === data?.user?.phone,
        password: '',
        image: data?.user?.image
          ? new File([data?.user?.image], data?.user?.image, {
              type: MediaTypes.Image
            })
          : null
      })
    }
  }, [data])

  const uploadImages = useUploadImages()

  const updateMe = useUpdateMe({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('shared.breadcrumb.profile')
        })
      )
      refetch()
    }
  })

  // this to update the cookies after updating the profile
  useEffect(() => {
    if (data && isSuccess && updateMe.isSuccess) {
      login(token as string, data?.user)
    }
  }, [data, isSuccess, updateMe.isSuccess])

  const handleSubmit = async (values: typeof DEFAULT_EMPLOYEE_FORM_DATA) => {
    const transformedData = transformData(
      EMPLOYEE_FORM_SCHEMA_WITH_REFINE(t),
      values
    )
    if (transformedData) {
      let imageUrl: string | null = null
      if (values.image) {
        if ((values.image as File).name.includes('storage.googleapis.com')) {
          imageUrl = (values.image as File).name
        } else {
          imageUrl = await uploadImage(values.image, uploadImages.mutateAsync)
        }
        if (!imageUrl) {
          appNotifications.error(t('errorMessages.shared.mediaUploadFailed'))
          return
        }
      }

      const dataToSend = {
        ...transformedData,
        image: imageUrl
      }

      updateMe.mutate({
        ...dataToSend,
        ...(values?.password && { password: values.password })
      } as UpdateUserRequestBody)

      form.setFieldValue('password', '')
    }
  }

  const deleteMe = useDeleteMe({
    onSuccess: () => {
      setShowDeleteModal(false)
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('shared.breadcrumb.account')
        })
      )
      logout()
      setToken(null)
    }
  })

  const handleDelete = () => {
    deleteMe.mutate()
  }

  if (isLoading || subscriptionLoading) {
    return <LoaderScreen />
  }

  if (isError) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack>
      <DeleteModal
        open={showDeleteModal}
        loading={deleteMe.isPending}
        setOpen={setShowDeleteModal}
        itemName={t('settings.subTitle')}
        onDelete={handleDelete}
      />
      <Text component='h1' className='text-3xl font-bold text-neutral-500'>
        {t('settings.title')}
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack className='rounded-xl border border-neutral-400 p-4'>
          <Card shadow='sm' radius='md'>
            <Stack>
              {data?.user?.username && (
                <Text>
                  {t('shared.fields.username')}: {data?.user?.username}
                </Text>
              )}
              <Text>
                {t('shared.placeholders.type')}:{' '}
                {userRoleMap(t, data?.user?.role as UserRoleType)}
              </Text>
              {!data?.user?.role.includes(UserRole.Admin) &&
                !data?.user?.role.includes(UserRole.User) && (
                  <Flex className='items-center gap-2'>
                    <Text>{t('shared.breadcrumb.credits')}: </Text>
                    <Text>{subscriptionData?.subscription?.credits}</Text>
                    <FaCoins className='text-primary' />
                  </Flex>
                )}
              <Text>
                {t('settings.registeredOn')}:{' '}
                {moment(data?.user?.createdAt)
                  .locale(locale)
                  .format(locale === 'ar' ? 'DD/MM/YYYY' : 'MM/DD/YYYY')}
              </Text>
            </Stack>
          </Card>

          <Divider className='my-4' />
          <Text component='h1' className='text-xl font-bold'>
            {t('settings.subTitle')}
          </Text>
          <UploadUserImage
            file={
              form.values.image as (typeof DEFAULT_EMPLOYEE_FORM_DATA)['image']
            }
            onFileChange={(file) =>
              form.setFieldValue(
                'image',
                file as (typeof DEFAULT_EMPLOYEE_FORM_DATA)['image']
              )
            }
          />

          <SimpleGrid cols={{ base: 1, md: 2, lg: 2 }}>
            <TextField
              {...form.getInputProps('name')}
              placeholder={t('shared.placeholders.fullName')}
              label={t('shared.fields.fullName')}
              type='text'
              size='md'
            />
            <TextField
              {...form.getInputProps('email')}
              showOptional={false}
              placeholder={t('shared.placeholders.email')}
              label={t('shared.fields.email')}
              disabled
              type='email'
              size='md'
            />
          </SimpleGrid>
          <Stack gap={2}>
            <PhoneNumberField
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
          <Stack gap={10}>
            <PasswordField
              size='md'
              {...form.getInputProps('password')}
              placeholder={t('shared.placeholders.password')}
              label={t('shared.fields.password')}
              type='password'
            />
            <Text
              component='p'
              className='text-xs font-semibold text-neutral-500'
            >
              {t('auth.signup.shared.basicInformation.fields.passwordHint')}
            </Text>
          </Stack>
          <TextareaField
            className='mb-4 h-[250px] border border-gray-200'
            placeholder={t('settings.placeholders.bio')}
            label={t('settings.fields.bio')}
          />

          <Group className='mt-4'>
            <Button
              loading={updateMe.isPending || uploadImages.isPending}
              type='submit'
              size='lg'
              className='w-full rounded-lg bg-gray-500 font-semibold text-white md:flex-1'
            >
              {t('shared.buttons.save')}
            </Button>
            <Button
              onClick={() => router.push(navigationLinks.landingPage)}
              variant='outline'
              color='gray'
              className='w-full rounded-lg font-semibold text-gray-500 md:flex-1'
              size='lg'
            >
              {t('shared.buttons.cancel')}
            </Button>
          </Group>
        </Stack>
      </form>

      <Stack className='rounded-xl border border-neutral-400 p-4'>
        <Flex className='items-center gap-1 text-xl font-bold'>
          <CiGlobe />
          {t('settings.fields.language.label')}
        </Flex>
        <Radio.Group
          name='language'
          {...form.getInputProps('language')}
          required={false}
        >
          <Stack mt='xs'>
            <Radio
              color='primary'
              variant='outline'
              labelPosition='left'
              size='md'
              className='capitalize'
              classNames={{
                body: 'flex items-center justify-between'
              }}
              label={t('settings.fields.language.arabic')}
              value='Arabic'
            />
            <Radio
              color='primary'
              variant='outline'
              labelPosition='left'
              size='md'
              className='capitalize'
              classNames={{
                body: 'flex items-center justify-between'
              }}
              label={t('settings.fields.language.english')}
              value='English'
            />
          </Stack>
        </Radio.Group>
        <Divider className='my-4' />
        <AppSwitch
          activeBg='bg-primary'
          size='md'
          labelPosition='left'
          classNames={{
            body: 'flex items-center justify-between'
          }}
          {...form.getInputProps('notifications')}
          label={
            <Flex className='w-fit items-center gap-1'>
              <CiBellOn size={20} />
              <span>{t('settings.fields.notifications')}</span>
            </Flex>
          }
          checked
        />
      </Stack>

      <Stack className='rounded-xl border border-neutral-400 p-4'>
        <Text className='text-xl font-bold'>
          {t('settings.deleteAccount.title')}
        </Text>
        <Text className='text-neutral-600'>
          {t('settings.deleteAccount.description')}
        </Text>
        <Button
          onClick={() => setShowDeleteModal(true)}
          className='mt-4 w-full rounded-lg bg-error-300 bg-opacity-40 font-semibold text-error-500 transition-colors duration-300 hover:bg-error-400 hover:bg-opacity-50 dark:bg-error-400 dark:text-default-text'
          size='lg'
          fullWidth
          leftSection={<IoTrashOutline size={20} />}
        >
          {t('settings.deleteAccount.title')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default SettingsSection
