'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { UserRoleType, UserStatus } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Stack } from '@mantine/core'
import {
  AGENT_SIGN_UP_FORM_SCHEMA_MERGED,
  COMPANY_SIGN_UP_FORM_SCHEMA,
  USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS
} from '@schemas/auth'

import { useUploadImageAuth } from '@hooks/auth/useUploadImageAuth'
import { useCreateUserAsAdmin } from '@hooks/query/users/admin/useCreateUserAsAdmin'
import { appNotifications, transformData } from '@utils'

import UserForm from './UserForm'

interface AddUserFormProps {
  role: UserRoleType
}

function AddUserForm({ role }: AddUserFormProps) {
  const router = useRouter()
  const { onImageUpload } = useUploadImageAuth()
  const createUser = useCreateUserAsAdmin({
    onSuccess: () => {
      router.push(navigationLinks.admin.users.allUsers)
      appNotifications.success('User created successfully')
    }
  })

  const handleSubmit = async (
    data: NonNullable<
      ReturnType<
        typeof transformData<
          | ReturnType<typeof COMPANY_SIGN_UP_FORM_SCHEMA>
          | ReturnType<typeof AGENT_SIGN_UP_FORM_SCHEMA_MERGED>
          | ReturnType<typeof USER_SIGN_UP_FORM_SCHEMA_WITH_EFFECTS>
        >
      >
    >
  ) => {
    createUser.mutate({
      ...data,
      status: UserStatus.Active,
      password: 'password' in data ? data.password || '' : '',
      role
    })
  }

  return (
    <Stack className='m-auto mt-10 w-full p-3 md:mt-0 md:p-0 lg:w-[80%]'>
      <UserForm
        role={role}
        loading={createUser.isPending}
        onImageUpload={onImageUpload}
        onSubmit={handleSubmit}
      />
    </Stack>
  )
}

export default AddUserForm
