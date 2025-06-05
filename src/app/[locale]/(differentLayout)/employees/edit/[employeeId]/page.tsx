import React from 'react'
import EditEmployeeForm from '@sections/Employees/EmployeesForm/EditEmployeeForm'

export interface EditEmployeePageProps {
  params: {
    employeeId: string
  }
}

function EditEmployeePage({ params: { employeeId } }: EditEmployeePageProps) {
  return <EditEmployeeForm employeeId={employeeId} />
}

export default EditEmployeePage
