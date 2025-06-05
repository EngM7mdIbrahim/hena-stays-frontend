'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { UpdateCompanyUserRequestBody, User } from '@commonTypes'
import {
  DEFAULT_EMPLOYEE_FORM_DATA,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import {
  useCreateUserAsCompany,
  useUpdateUserAsCompany,
  useUploadImages
} from '@hooks'
import { Button, Group, Input, Stack, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { EMPLOYEE_FORM_SCHEMA_WITH_REFINE } from '@schemas'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import CheckboxField from '@components/CustomFields/CheckboxField'
import PasswordField from '@components/CustomFields/PasswordField'
import PhoneNumberField from '@components/CustomFields/PhoneNumberField'
import TextField from '@components/CustomFields/TextField'
import UploadUserImage from '@components/UploadUserImage'
import { appNotifications, transformData, uploadImage } from '@utils'

export interface EmployeeFormProps {
  isEdit?: boolean
  defaultValues?: Omit<UpdateCompanyUserRequestBody, 'image' | 'watermark'> & {
    _id: string
  }
}

function EmployeeForm({ isEdit, defaultValues }: EmployeeFormProps) {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const form = useForm({
    mode: 'controlled',
    initialValues: DEFAULT_EMPLOYEE_FORM_DATA,
    validate: zodResolver(EMPLOYEE_FORM_SCHEMA_WITH_REFINE(t))
  })

  useEffect(() => {
    if (isEdit && defaultValues) {
      form.setValues({
        ...defaultValues,
        isEdit
      })
    }
  }, [isEdit, defaultValues])

  useEffect(() => {
    const role = searchParams.get(SEARCH_PARAM_KEYS.TYPE_KEY)
    if (role) {
      form.setFieldValue('role', role as User['role'])
    }
  }, [searchParams])

  const uploadImages = useUploadImages()

  const createEmployee = useCreateUserAsCompany({
    onSuccess: () => {
      router.push(navigationLinks.work.employees)
      appNotifications.success(
        t('successMessages.createdSuccessfully', {
          item: t('shared.breadcrumb.employee')
        })
      )
    }
  })

  const updateEmployee = useUpdateUserAsCompany({
    onSuccess: () => {
      router.push(navigationLinks.work.employees)
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('shared.breadcrumb.employee')
        })
      )
    }
  })

  const handleSubmit = async (data: typeof DEFAULT_EMPLOYEE_FORM_DATA) => {
    const transformedData = transformData(
      EMPLOYEE_FORM_SCHEMA_WITH_REFINE(t),
      data
    )
    if (transformedData) {
      let imageUrl: string | null = null
      if (data.image) {
        if ((data.image as File).name.includes('storage.googleapis.com')) {
          imageUrl = (data.image as File).name
        } else {
          imageUrl = await uploadImage(data.image, uploadImages.mutateAsync)
        }
        if (!imageUrl) {
          appNotifications.error(t('errorMessages.shared.mediaUploadFailed'))
          return
        }
      }

      const dataToSend = {
        ...transformedData,
        role: data.role,
        image: imageUrl
      }

      if (isEdit) {
        updateEmployee.mutate({
          ...dataToSend,
          id: defaultValues?._id as string
        })
      } else {
        createEmployee.mutate({
          ...dataToSend,
          password: data.password
        })
      }
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack className='py-4'>
        <UploadUserImage
          file={form.values.image}
          onFileChange={(file) =>
            form.setFieldValue(
              'image',
              file as (typeof DEFAULT_EMPLOYEE_FORM_DATA)['image']
            )
          }
        />
        <TextField
          withAsterisk
          {...form.getInputProps('username')}
          placeholder={t('shared.placeholders.username')}
          label={t('shared.fields.username')}
          type='text'
          required
          size='md'
        />
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
          withAsterisk
          {...form.getInputProps('email')}
          placeholder={t('shared.placeholders.email')}
          label={t('shared.fields.email')}
          type='email'
          required
          size='md'
        />
        <Stack gap={2}>
          <PhoneNumberField
            required
            label={t('shared.fields.phoneNumber')}
            {...form.getInputProps('phone')}
          />
          {form.errors.phone && <Input.Error>{form.errors.phone}</Input.Error>}
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
        <Stack gap={10}>
          <PasswordField
            min={isEdit ? 0 : 8}
            withAsterisk={!isEdit}
            size='md'
            {...form.getInputProps('password')}
            placeholder={t('shared.placeholders.password')}
            label={t('shared.fields.password')}
            type='password'
            required={!isEdit}
          />

          <Text
            component='p'
            className='text-xs font-semibold text-neutral-500'
          >
            {t('auth.signup.shared.basicInformation.fields.passwordHint')}
          </Text>
        </Stack>

        <Group>
          <PrimaryButton
            loading={createEmployee.isPending || updateEmployee.isPending}
            type='submit'
            size='lg'
            className='w-full rounded-lg font-semibold text-secondary md:flex-1'
          >
            {isEdit ? t('shared.buttons.update') : t('shared.buttons.save')}
          </PrimaryButton>
          <Button
            onClick={router.back}
            variant='light'
            color='gray'
            className='w-full rounded-lg font-semibold text-primary md:flex-1'
            size='lg'
          >
            {t('shared.buttons.back')}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

export default EmployeeForm
