'use client'

import React from 'react'
import Link from 'next/link'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions, useProjectsList } from '@hooks'
import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiPlus } from 'react-icons/bi'

import CustomPagination from '@components/AppPagination'
import Breadcrumb from '@components/Breadcrumb'
import EmptyWrapper from '@components/EmptyWrapper'
import ProjectFilters from '@components/Filters/ProjectFilters'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import ProjectCard, { ProjectCardSkeleton } from '@components/ProjectCard'

export interface ProjectsSectionProps {
  recommended?: boolean
}

function ProjectsSection({ recommended = false }: ProjectsSectionProps) {
  const t = useTranslations()
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.projects'),
      link: navigationLinks.projects.allProjects
    }
  ]
  const {
    projects,
    data,
    isLoading,
    isError,
    error,
    sort,
    setSort,
    limit,
    setLimit,

    filters,
    setFilters
  } = useProjectsList({ recommended })

  const { permissions } = useGetUserPermissions(Modules.PROJECTS)
  const { canViewMyProjects, canCreateProject } = permissions

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <>
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <Stack gap='md'>
        <Group className='mt-4 w-full items-baseline justify-between'>
          <Stack>
            <Text
              component='h1'
              className='text-2xl font-bold text-neutral-700 md:text-4xl'
            >
              {t('projects.title')}
            </Text>
            <Text
              component='p'
              className='text-sm font-semibold capitalize text-neutral-600'
            >
              {data?.total === 1
                ? `${data?.total.toLocaleString('en-US') || ''} ${t('projects.project')}`
                : `${data?.total.toLocaleString('en-US') || ''} ${t('projects.title')}`}
            </Text>
          </Stack>
          <Group>
            {canViewMyProjects && (
              <Button
                variant='light'
                color='gray'
                className='w-fit rounded-lg font-semibold text-primary'
                size='lg'
                component={Link}
                href={navigationLinks.projects.myProjects}
              >
                {t('projects.mine')}
              </Button>
            )}
            {canCreateProject && (
              <Button
                component={Link}
                href={navigationLinks.projects.addProject}
                variant='light'
                color='gray'
                className='rounded-lg font-semibold text-primary'
                size='lg'
                leftSection={<BiPlus size={24} />}
              >
                {t('projects.buttons.addProject')}
              </Button>
            )}
          </Group>
        </Group>
        <ProjectFilters
          sort={sort}
          setSort={setSort}
          limit={limit}
          setLimit={setLimit}
          filters={filters}
          onFiltersChange={setFilters}
        />

        <ItemsWrapper
          loading={isLoading}
          className='grid grid-cols-1 gap-4 md:grid-cols-2'
          LoadingComponent={<ProjectCardSkeleton />}
          EmptyComponent={
            <EmptyWrapper
              description={t('shared.emptyDescription', {
                itemName: t('projects.title')
              })}
            />
          }
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </ItemsWrapper>
        <Box className='mt-8 flex items-center justify-center py-4'>
          <CustomPagination
            value={data?.page || (filters.page ? Number(filters.page) : 1)}
            onChange={(value) =>
              setFilters({ ...filters, page: String(value) })
            }
            total={data?.totalPages ?? 0}
          />
        </Box>
      </Stack>
    </>
  )
}

export default ProjectsSection
