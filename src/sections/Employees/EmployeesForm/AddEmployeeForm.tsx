'use client'

import React from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import EmployeeForm from '@sections/Employees/EmployeesForm'

import LoaderScreen from '@components/LoaderScreen'

function AddEmployeeForm() {
  const { permissions } = useGetUserPermissions(Modules.EMPLOYEES)
  const isLoaded = useProtectRoute(permissions.canAddEmployee)

  // Show loader if no permission
  if (!isLoaded) {
    return <LoaderScreen />
  }

  return <EmployeeForm />
}

export default AddEmployeeForm
