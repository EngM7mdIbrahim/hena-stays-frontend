'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ProjectStatus, ProjectStatusEnum } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions, useProjectsList } from '@hooks'
import { Box, Button, Flex, Group, Stack, Text } from '@mantine/core'
import { OwnerPropertiesSectionProps } from '@sections/Properties/OwnerPropertiesSection'
import { useTranslations } from 'next-intl'
import { BiPlus } from 'react-icons/bi'
import { FaBuildingCircleExclamation, FaBuildingUser } from 'react-icons/fa6'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import AppPagination from '@components/AppPagination'
import EmptyWrapper from '@components/EmptyWrapper'
import ProjectFilters from '@components/Filters/ProjectFilters'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import ProjectCard, { ProjectCardSkeleton } from '@components/ProjectCard'

function OwnerProjectsSection({
  mine = true,
  userId
}: OwnerPropertiesSectionProps) {
  const t = useTranslations()

  const [status, setStatus] = useState<ProjectStatus>(ProjectStatusEnum.Hold)

  const { permissions } = useGetUserPermissions(Modules.PROJECTS)
  const { canCreateProject } = permissions

  const controlsData = [
    {
      value: ProjectStatusEnum.Active,
      label: (
        <Flex className='items-center gap-2'>
          <FaBuildingUser size={24} />
          <Text>{t('projects.controls.activeProjects')}</Text>
        </Flex>
      )
    },
    {
      value: ProjectStatusEnum.Hold,
      label: (
        <Flex className='items-center gap-2'>
          <FaBuildingCircleExclamation size={24} />
          <Text>{t('projects.controls.heldProjects')}</Text>
        </Flex>
      )
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
  } = useProjectsList({
    ...(mine && { mine: `${mine}` }),
    status,
    owner: userId
  })

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack gap='md'>
      <Group className='w-full items-baseline justify-between'>
        <Stack>
          <Text
            component='h1'
            className='text-2xl font-bold text-neutral-700 md:text-4xl'
          >
            {mine ? t('projects.mine') : t('projects.title')} (
            {data?.total?.toLocaleString('en-US')})
          </Text>
        </Stack>
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

      <ProjectFilters
        sort={sort}
        setSort={setSort}
        limit={limit}
        setLimit={setLimit}
        filters={filters}
        onFiltersChange={setFilters}
      />
      <Box>
        <AppFragmentTabsControl
          notActiveBg='bg-brand-100/80'
          textColor='text-neutral-600'
          data={controlsData}
          value={String(status)}
          onChange={(value) => {
            setFilters({})
            setStatus(value as ProjectStatus)
          }}
        />
      </Box>

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
        {projects?.map((project) => (
          <ProjectCard status={status} key={project._id} project={project} />
        ))}
      </ItemsWrapper>
      <Box className='mt-8 flex items-center justify-center'>
        <AppPagination
          activeBgColor='linear-gradient(180deg, #F6A649 0%, #90612B 100%)'
          value={data?.page || (filters.page ? Number(filters.page) : 1)}
          onChange={(value) => setFilters({ ...filters, page: String(value) })}
          total={data?.totalPages ?? 0}
        />
      </Box>
    </Stack>
  )
}

export default OwnerProjectsSection
