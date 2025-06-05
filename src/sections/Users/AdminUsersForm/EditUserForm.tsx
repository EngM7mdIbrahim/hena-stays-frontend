'use client'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Broker, Company, UserRole, UserRoleType } from '@commonTypes'
import {
  DEFAULT_AGENT_SIGNUP_FORM_DATA,
  DEFAULT_COMPANY_SIGNUP_FORM_DATA,
  DEFAULT_USER_SIGNUP_FORM_DATA,
  navigationLinks
} from '@constants'
import { isPopulated } from '@guards'
import { useGetUserAsAdmin } from '@hooks'
import { Stack } from '@mantine/core'
import {
  AGENT_SIGN_UP_FORM_SCHEMA_MERGED,
  COMPANY_SIGN_UP_FORM_SCHEMA,
  USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS
} from '@schemas/auth'

import { useUploadImageAuth } from '@hooks/auth/useUploadImageAuth'
import { useUpdateUserAsAdmin } from '@hooks/query/users/admin/useUpdateUserAsAdmin'
import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'
import { appNotifications, transformData } from '@utils'

import UserForm from './UserForm'

interface EditUserFormProps {
  role: UserRoleType
  userId: string
}

function EditUserForm({ role, userId }: EditUserFormProps) {
  const { data, isLoading, isError, error } = useGetUserAsAdmin({
    id: userId,
    showFields: {
      company: true,
      broker: true
    }
  })

  const defaultValues = useMemo(() => {
    const userData = data?.user
    if (!userData) return null

    const baseValues = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      whatsapp: userData.whatsapp,
      username: userData.username || '',
      sameAsWhatsapp: userData.whatsapp === userData.phone,
      password: '',
      confirmPassword: ''
    }

    switch (role) {
      case UserRole.Company:
        return {
          ...(isPopulated<Company>(userData.company)
            ? {
                ...userData.company,
                companyName: userData.company.name,
                licenseExpiryDate: new Date(userData.company.licenseExpiryDate),
                licenseCopies: userData.company.licenseCopies.map(
                  (copy) => new File([copy], copy)
                ),
                watermark: userData.company.watermark
                  ? new File(
                      [userData.company.watermark],
                      userData.company.watermark
                    )
                  : null
              }
            : {
                licenseCopies: [],
                watermark: null
              }),
          ...baseValues
        } as typeof DEFAULT_COMPANY_SIGNUP_FORM_DATA
      case UserRole.Broker:
        return {
          ...(isPopulated<Broker>(userData.broker)
            ? {
                ...userData.broker,
                licenseExpiryDate: new Date(userData.broker.licenseExpiryDate),
                licenseCopies: userData.broker?.licenseCopies.map(
                  (copy: string) => new File([copy], copy)
                ),
                watermark: userData.broker.watermark
                  ? new File(
                      [userData.broker.watermark],
                      userData.broker.watermark
                    )
                  : null
              }
            : {
                licenseCopies: [],
                watermark: null
              }),

          ...baseValues
        } as typeof DEFAULT_AGENT_SIGNUP_FORM_DATA
      default:
        return {
          ...baseValues
        } as typeof DEFAULT_USER_SIGNUP_FORM_DATA
    }
  }, [data, role])

  const router = useRouter()
  const { onImageUpload } = useUploadImageAuth()
  const updateUser = useUpdateUserAsAdmin({
    onSuccess: () => {
      router.push(navigationLinks.admin.users.allUsers)
      appNotifications.success('User updated successfully')
    }
  })

  const handleSubmit = async (
    values: NonNullable<
      ReturnType<
        typeof transformData<
          | ReturnType<typeof COMPANY_SIGN_UP_FORM_SCHEMA>
          | ReturnType<typeof AGENT_SIGN_UP_FORM_SCHEMA_MERGED>
          | ReturnType<typeof USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS>
        >
      >
    >
  ) => {
    updateUser.mutate({
      ...values,
      role,
      id: userId
    })
  }

  if (isLoading) {
    return <LoaderScreen />
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack className='m-auto mt-10 w-full p-3 md:mt-0 md:p-0 lg:w-[80%]'>
      <UserForm
        role={role}
        loading={updateUser.isPending}
        defaultValues={defaultValues}
        onImageUpload={onImageUpload}
        onSubmit={handleSubmit}
      />
    </Stack>
  )
}

export default EditUserForm
