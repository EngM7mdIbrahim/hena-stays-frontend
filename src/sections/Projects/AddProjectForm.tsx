'use client'

import React from 'react'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectRoute } from '@hooks'
import ProjectForm from '@sections/Projects/ProjectForm'

import LoaderScreen from '@components/LoaderScreen'

function AddProjectForm() {
  const { permissions } = useGetUserPermissions(Modules.PROJECTS)
  const isLoaded = useProtectRoute(permissions.canCreateProject)

  // Show loader if no permission
  if (!isLoaded) {
    return <LoaderScreen />
  }

  return <ProjectForm />
}

export default AddProjectForm
