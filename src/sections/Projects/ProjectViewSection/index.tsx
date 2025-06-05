'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { BooleanString, ProjectStatusEnum } from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { Modules } from '@enums'
import {
  useDeleteProject,
  useGetProjectById,
  useGetUserPermissions,
  useLinkConstructor
} from '@hooks'
import { ActionIcon, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { PropertyViewSectionLoading } from '@sections/Properties/PropertyViewSection'
import { useTranslations } from 'next-intl'
import { BiTrashAlt } from 'react-icons/bi'
import { FaRegEdit } from 'react-icons/fa'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import Breadcrumb from '@components/Breadcrumb'
import FullScreenError from '@components/FullScreenError'
import ImageGalleryDesktop from '@components/ImageGallery/ImagesGalleryDesktop'
import ImageGalleryMobile from '@components/ImageGallery/ImagesGalleryMobile'
import ImageGalleryModal from '@components/ImageGallery/ImagesGalleryModal'
import AppModal from '@components/Modals/AppModal'
import DeleteModal from '@components/Modals/DeleteModal'
import ShareModal from '@components/Modals/ShareModal'
import { appNotifications } from '@utils'

import ProjectDescription from './ProjectDescription'
import ProjectLocation from './ProjectLocation'
import ProjectPaymentPlan from './ProjectPaymentPlan'
import ProjectProperties from './ProjectProperties'
import ProjectUnitTypes from './ProjectUnitTypes'

export interface ProjectViewSectionProps {
  projectId: string
}

function ProjectViewSection({ projectId }: ProjectViewSectionProps) {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openShareModal, setOpenShareModal] = useState(false)

  const [currIndex, setCurrIndex] = useState<number | null>(null)
  const [currentSelected, setCurrentSelected] = useState<string>('Description')
  const { user, permissions } = useGetUserPermissions(Modules.PROJECTS)
  const { canEditProject, canDeleteProject } = permissions
  const { constructLink } = useLinkConstructor()

  const getProject = useGetProjectById({
    id: projectId,

    // this to make it available for the owner
    mine: String(
      user?._id === searchParams.get(SEARCH_PARAM_KEYS.OWNER_KEY) ||
        user?.company === searchParams.get(SEARCH_PARAM_KEYS.COMPANY_KEY)
    ) as BooleanString,

    showFields: {
      owner: true,
      units: {
        category: true,
        subCategory: true
      }
    }
  })
  const project = getProject?.data?.project

  const list = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.projects'),
      link: navigationLinks.projects.allProjects
    },
    {
      label: project?.title || t('projects.project'),
      link: navigationLinks.projects.viewProject(projectId)
    }
  ]

  const deleteProject = useDeleteProject({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('projects.project')
        })
      )
      router.push(navigationLinks.projects.myProjects)
    }
  })

  const handleDeleteProperty = () => {
    deleteProject.mutate({
      id: projectId
    })
    setOpenDeleteModal(false)
  }

  const handleMovingBetweenTabs = (tab: string) => {
    setCurrentSelected(tab)
  }
  let content = null
  if (currentSelected === 'Description') {
    content = <ProjectDescription project={project} />
  }
  if (currentSelected === 'Properties') {
    content = <ProjectProperties project={project} />
  }
  if (currentSelected === 'Location') {
    content = <ProjectLocation project={project} />
  }
  if (currentSelected === 'Payment Plan') {
    content = <ProjectPaymentPlan project={project} />
  }
  if (currentSelected === 'Unit Types') {
    content = <ProjectUnitTypes project={project} />
  }

  if (getProject.isLoading) {
    return <PropertyViewSectionLoading />
  }

  if (getProject.isError) {
    return <FullScreenError error={getProject.error} />
  }

  return (
    <>
      <Breadcrumb className='gap-2 md:gap-0' list={list} />

      <Stack className='gap-6'>
        <DeleteModal
          onDelete={handleDeleteProperty}
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          itemName={t('projects.project')}
        />
        {project?.media && project?.media?.length > 0 && (
          <>
            <AppModal
              size='xl'
              title={t('shared.fields.media', {
                itemName: t('projects.project')
              })}
              open={currIndex !== null}
              setOpen={() => setCurrIndex(null)}
            >
              <ImageGalleryModal
                defaultIndex={currIndex || 0}
                images={project?.media || []}
              />
            </AppModal>
            {isMobile ? (
              <ImageGalleryMobile images={project?.media || []} />
            ) : (
              <ImageGalleryDesktop
                handleClick={setCurrIndex}
                images={project?.media || []}
              />
            )}
          </>
        )}

        <Group className='items-center justify-between gap-3'>
          <Text className='text-base capitalize text-neutral-700 md:text-xl'>
            {project?.title}
          </Text>
          <ActionIcon.Group className='gap-4'>
            {/* the edit and delete will appear only if the user is the owner */}
            {canEditProject(user, project) && (
              <ActionIcon
                component={Link}
                href={constructLink(
                  navigationLinks.projects.editProject(projectId)
                )}
                variant='default'
                className='items-center rounded-full bg-default-background text-neutral-700'
                size='lg'
                aria-label='Edit Project'
              >
                <FaRegEdit />
              </ActionIcon>
            )}
            {canDeleteProject(user, project) && (
              <ActionIcon
                onClick={() => setOpenDeleteModal(true)}
                variant='default'
                className='rounded-full bg-default-background text-neutral-700'
                size='lg'
                aria-label='Delete Project'
              >
                <BiTrashAlt />
              </ActionIcon>
            )}
            {project?.status === ProjectStatusEnum.Active && (
              <ShareModal
                open={openShareModal}
                setOpen={setOpenShareModal}
                linkToCopy={`${window.location}`}
              />
            )}
          </ActionIcon.Group>
        </Group>

        <Stack>
          <ScrollArea offsetScrollbars>
            <AppFragmentTabsControl
              textColor='text-primary'
              notActiveBg='bg-neutral-50'
              value={currentSelected}
              onChange={handleMovingBetweenTabs}
              data={[
                {
                  value: 'Description',
                  label: t('projects.projectView.tabs.description.title')
                },
                {
                  value: 'Properties',
                  label: t('projects.projectView.tabs.properties')
                },
                {
                  value: 'Location',
                  label: t('projects.projectView.tabs.location')
                },
                {
                  value: 'Payment Plan',
                  label: t('projects.projectView.tabs.paymentPlan.title')
                },
                {
                  value: 'Unit Types',
                  label: t('projects.projectView.tabs.unitTypes.title')
                }
              ]}
            />
          </ScrollArea>
          {content}
        </Stack>
      </Stack>
    </>
  )
}

export default ProjectViewSection
