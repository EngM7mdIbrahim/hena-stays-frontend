'use client'

import React from 'react'
import { QUERY_KEYS } from '@constants'
import { Modules } from '@enums'
import {
  useGetProjectById,
  useGetUserPermissions,
  useProtectRoute
} from '@hooks'
import { Box } from '@mantine/core'
import moment from 'moment'

import LoaderScreen from '@components/LoaderScreen'

import ProjectForm from './ProjectForm'
import { ProjectViewSectionProps } from './ProjectViewSection'

function EditProjectForm({ projectId }: ProjectViewSectionProps) {
  const getProjectRequest = useGetProjectById(
    {
      id: projectId,
      mine: 'true'
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      queryKey: [QUERY_KEYS.PROJECTS.SINGLE_PROJECT(projectId)]
    }
  )

  const project = getProjectRequest?.data?.project

  const defaultValues = {
    ...project,

    handOverDate: moment(project?.handOverDate || new Date())
      .startOf('day')
      .toDate(),

    media: project?.media.map((mediaItem) => ({
      file: new File([mediaItem.url], mediaItem.url, {
        type: mediaItem.type
      }),
      preview: mediaItem.url
    })),

    preHandOverPercentage:
      project?.paymentPlan?.fullPrice?.preHandOverPercentage || null,
    monthsNumber: project?.paymentPlan?.fullPrice?.monthsNumber || null,

    paymentType:
      project?.paymentPlan?.projectCompletion &&
      project?.paymentPlan?.projectCompletion?.length > 0
        ? 'projectCompletion'
        : 'fullPrice'
  }

  const { permissions } = useGetUserPermissions(Modules.PROJECTS)
  const isLoaded = useProtectRoute(permissions.canEditProject, project)

  // Show loader while loading or if no permission
  if (getProjectRequest.isLoading || !isLoaded) {
    return <LoaderScreen />
  }

  return (
    <Box>
      <ProjectForm isEdit defaultValues={defaultValues} />
    </Box>
  )
}

export default EditProjectForm
