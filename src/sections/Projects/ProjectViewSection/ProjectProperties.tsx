'use client'

import React from 'react'
import Link from 'next/link'
import { Project } from '@commonTypes'
import {
  defaultLimitOptions,
  navigationLinks,
  propertySortOptions,
  SEARCH_PARAM_KEYS
} from '@constants'
import { Modules } from '@enums'
import {
  useGetUserPermissions,
  useLinkConstructor,
  usePropertiesList
} from '@hooks'
import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiPlus } from 'react-icons/bi'

import AppPagination from '@components/AppPagination'
import EmptyWrapper from '@components/EmptyWrapper'
import FullScreenError from '@components/FullScreenError'
import ItemsWrapper from '@components/ItemWrapper'
import LimitButton from '@components/LimitButton'
import PropertyCard, { PropertyCardSkeleton } from '@components/PropertyCard'
import SortButton from '@components/SortButton'

export interface ProjectPropertiesProps {
  project: Project | undefined
}

function ProjectProperties({ project }: ProjectPropertiesProps) {
  const t = useTranslations()
  const { constructLink } = useLinkConstructor()
  const { user, permissions } = useGetUserPermissions(Modules.PROJECTS)
  const { canAddPropertyToProject } = permissions
  const {
    properties,
    data,
    isLoading,
    isError,
    error,
    sort,
    setSort,
    page,
    setPage,
    limit,
    setLimit
  } = usePropertiesList({
    project: project?._id,
    // this to fetch the inactive properties for the owner or the company admin
    mine: String(canAddPropertyToProject(user, project))
  })

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack gap='md'>
      <Group className='mt-4 w-full items-baseline justify-between'>
        <Stack>
          <Text
            component='h1'
            className='text-2xl font-bold text-neutral-700 md:text-4xl'
          >
            {t('projects.projectView.tabs.properties')}
          </Text>
          <Text
            component='p'
            className='text-sm font-semibold capitalize text-neutral-600'
          >
            {data?.total === 1
              ? `${data?.total.toLocaleString('en-US') || ''} ${t('properties.property')}`
              : `${data?.total.toLocaleString('en-US') || ''} ${t('properties.properties')}`}
          </Text>
        </Stack>
        {canAddPropertyToProject(user, project) && (
          <Button
            component={Link}
            href={constructLink(navigationLinks.properties.addProperty, {
              [SEARCH_PARAM_KEYS.PROJECT_KEY]: project?._id,
              [SEARCH_PARAM_KEYS.STATUS_KEY]: project?.status
            })}
            variant='light'
            color='gray'
            className='rounded-lg font-semibold text-primary'
            size='lg'
            leftSection={<BiPlus size={24} />}
          >
            {t('properties.mainBanner.buttonTitle')}
          </Button>
        )}
      </Group>

      <Group className='justify-between'>
        <Box className='flex w-full max-w-[410px] items-center gap-2'>
          <SortButton
            radius='xl'
            value={sort ? JSON.stringify(sort) : null}
            onChange={(value) => {
              setSort(value ? JSON.parse(value) : null)
            }}
            data={propertySortOptions(t)}
          />
          <LimitButton
            radius='xl'
            value={limit}
            onChange={(value) => {
              setLimit(value ?? defaultLimitOptions[0].value)
            }}
            data={defaultLimitOptions}
          />
        </Box>
      </Group>

      <ItemsWrapper
        loading={isLoading}
        className='grid grid-cols-1 gap-4 md:grid-cols-2'
        LoadingComponent={<PropertyCardSkeleton />}
        EmptyComponent={
          <EmptyWrapper
            description={t('shared.emptyDescription', {
              itemName: t('properties.properties')
            })}
          />
        }
      >
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            layout='horizontal'
            property={property}
            showAgent={false}
            showAdditionalFeatures={false}
          />
        ))}
      </ItemsWrapper>
      <Box className='mt-8 flex items-center justify-center py-4'>
        <AppPagination
          value={data?.page || +page}
          onChange={(value) => setPage(String(value))}
          total={data?.totalPages ?? 0}
        />
      </Box>
    </Stack>
  )
}

export default ProjectProperties
