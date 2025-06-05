'use client'

import React from 'react'
import { MediaTypes } from '@commonTypes'
import { Modules } from '@enums'
import {
  useGetUserAsCompany,
  useGetUserPermissions,
  useProtectRoute
} from '@hooks'
import { Box } from '@mantine/core'
import EmployeeForm from '@sections/Employees/EmployeesForm'

import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'

export interface EditEmployeeFormProps {
  employeeId: string
}

function EditEmployeeForm({ employeeId }: EditEmployeeFormProps) {
  const { data, isLoading, isError, error } = useGetUserAsCompany({
    id: employeeId
  })

  const user = data?.user
  const { permissions } = useGetUserPermissions(Modules.EMPLOYEES)
  const isLoaded = useProtectRoute(permissions.canEditEmployee, user)

  const defaultValues = user && {
    ...user,
    password: '',
    image:
      user?.image &&
      new File([user.image], user.image, {
        type: MediaTypes.Image
      }),
    sameAsWhatsapp: user?.whatsapp === user?.phone
  }

  if (isError) {
    return <FullScreenError error={error} />
  }

  return (
    <Box>
      {isLoading || !isLoaded ? (
        <LoaderScreen />
      ) : (
        <EmployeeForm isEdit defaultValues={defaultValues} />
      )}
    </Box>
  )
}

export default EditEmployeeForm
