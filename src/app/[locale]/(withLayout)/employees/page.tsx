import React from 'react'
import { Stack } from '@mantine/core'
import EmployeesSection from '@sections/Employees'

function EmployeesPage() {
  return (
    <Stack className='px-4 md:px-12'>
      <EmployeesSection />
    </Stack>
  )
}

export default EmployeesPage
