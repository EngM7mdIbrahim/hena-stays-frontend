import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectById } from '@apis'
import { CurrencyCode, MediaTypes, ProjectStatusEnum, User } from '@commonTypes'
import {
  generateMetadataProperties,
  navigationLinks,
  SEARCH_PARAM_KEYS
} from '@constants'
import { isPopulated } from '@guards'
import { Stack } from '@mantine/core'
import ProjectViewSection from '@sections/Projects/ProjectViewSection'

import HeadScript from '@components/HeadScript'
import { safeFetch } from '@utils'

const keywords = [
  'project',
  'real estate',
  'development',
  'construction',
  'investment'
]

export interface ProjectViewPageProps {
  params: {
    projectId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export async function generateMetadata({
  params,
  searchParams
}: ProjectViewPageProps): Promise<Metadata> {
  const { projectId } = params

  if (searchParams[SEARCH_PARAM_KEYS.STATUS_KEY] === ProjectStatusEnum.Hold) {
    return {}
  }

  const { success, data } = await safeFetch(getProjectById, [
    {
      id: projectId,
      showFields: {
        owner: true
      }
    }
  ])

  if (!success)
    return {
      title: 'Project not found'
    }
  const { project } = data

  if (!isPopulated<User>(project?.owner)) return {}

  return {
    ...generateMetadataProperties({
      title: `${project?.title} | TrueDar`,
      creator: project?.owner?.name,
      description: project?.description,
      images: project?.media
        ?.filter((item) => item.type === MediaTypes.Image)
        .map((item) => item.url),
      publishedTime: new Date(project?.createdAt).toISOString(),
      url: `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.projects.viewProject(
        projectId
      )}`,
      authors: [project?.owner?.name]
    })
  }
}

async function ProjectViewPage({ params, searchParams }: ProjectViewPageProps) {
  const { projectId } = params
  const isHoldStatus =
    searchParams[SEARCH_PARAM_KEYS.STATUS_KEY] === ProjectStatusEnum.Hold

  let project = null
  let jsonLd = null

  // ✅ Only fetch project if status is NOT "Hold"
  if (!isHoldStatus) {
    const { success, data } = await safeFetch(getProjectById, [
      {
        id: projectId,
        showFields: { owner: true }
      }
    ])

    if (!success) {
      return notFound()
    }
    project = data.project

    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'keywords': keywords,
      'name': project?.title,
      'url': `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.projects.viewProject(projectId)}`,
      'image': project?.media
        ?.filter((item) => item.type === MediaTypes.Image)
        .map((item) => item.url),
      'description': project?.description,
      'brand': {
        '@type': 'Brand',
        'name': 'TrueDar'
      },
      'offers': {
        '@type': 'Offer',
        'price': project?.startingPrice,
        'priceCurrency': CurrencyCode.Aed,
        'url': `${process.env.NEXT_PUBLIC_HOST_URL}${navigationLinks.projects.viewProject(projectId)}`
      }
    }
  }

  return (
    <Stack className='gap-4 px-4 md:px-8 lg:px-12'>
      {!isHoldStatus && jsonLd && <HeadScript id='json-ld' content={jsonLd} />}
      <ProjectViewSection projectId={params.projectId} />
    </Stack>
  )
}

export default ProjectViewPage
