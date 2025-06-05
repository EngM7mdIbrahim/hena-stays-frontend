import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Company,
  Project,
  ProjectInteractions,
  ProjectStatus,
  ProjectStatusEnum,
  User
} from '@commonTypes'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { Modules } from '@enums'
import { isDark, isPopulated } from '@guards'
import {
  useDeleteProject,
  useGetUserPermissions,
  useLinkConstructor,
  useUpdateProject
} from '@hooks'
import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Group,
  Loader,
  Skeleton,
  Stack,
  Text,
  useMantineColorScheme
} from '@mantine/core'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import { BiTrash } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { GiThumbDown, GiThumbUp } from 'react-icons/gi'
import { PiPencilCircleLight } from 'react-icons/pi'

import Actions from '@components/Actions'
import { Details } from '@components/Analytics/PropertyAdCard'
import DeleteModal from '@components/Modals/DeleteModal'
import { appNotifications, formatNumberToShortForm } from '@utils'

interface ProjectCardProps {
  project: Project & { interaction?: ProjectInteractions }
  status?: ProjectStatus
}

export function ProjectCardSkeleton() {
  return (
    <Flex className='flex-col rounded-lg border border-neutral-200 shadow-lg md:flex-row'>
      {/* Left Side - Image Section */}
      <Skeleton className='relative min-h-[300px] md:min-h-[0] md:w-[65%]' />

      <Box className='w-full space-y-2 p-4'>
        {/* Header */}
        <Stack>
          <Skeleton className='h-6 w-1/2' />
          <Skeleton className='h-6 w-1/3' />
        </Stack>

        {/* Location */}
        <Skeleton className='h-6 w-full' />

        {/* Handover and Payment Plan */}
        <Flex className='gap-4 text-xs text-neutral-500'>
          <Box>
            <Skeleton className='h-6 w-1/2' />
            <Skeleton className='h-6 w-1/2' />
          </Box>
          <Box>
            <Skeleton className='h-6 w-1/2' />
            <Skeleton className='h-6 w-1/2' />
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

function ProjectCard({ project, status }: ProjectCardProps) {
  const t = useTranslations()
  const router = useRouter()

  const { user, permissions } = useGetUserPermissions(Modules.PROJECTS)
  const {
    canEditProject,
    canRecommendProject,
    canDeleteProject,
    canSeeInteractions
  } = permissions

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { constructLink } = useLinkConstructor()
  const { colorScheme } = useMantineColorScheme()

  const deleteProject = useDeleteProject({
    onSuccess: () => {
      appNotifications.success('Project Deleted Successfully')
      router.push(navigationLinks.projects.myProjects)
    }
  })

  const updateProjectStatus = useUpdateProject({
    onSuccess: () => {
      appNotifications.success('Project Status Updated Successfully')
    }
  })

  const handleDeleteProject = () => {
    deleteProject.mutate({
      id: project?._id
    })
    setShowDeleteModal(false)
  }

  const menuActionsLoading = useMemo(() => {
    return updateProjectStatus.isPending
  }, [updateProjectStatus.isPending])

  const editMenuItems = [
    ...(canEditProject(user, project)
      ? [
          {
            label: t('shared.actions.edit'),
            icon: <PiPencilCircleLight />,
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation()
              router.push(
                constructLink(
                  navigationLinks.projects.editProject(project?._id)
                )
              )
            }
          },
          {
            label:
              project?.status === ProjectStatusEnum.Hold
                ? t('shared.actions.activate')
                : t('shared.actions.deactivate'),
            icon:
              project?.status === ProjectStatusEnum.Active ? (
                <FaEye />
              ) : (
                <FaEyeSlash />
              ),
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation()
              updateProjectStatus.mutate({
                id: project?._id,
                status:
                  project?.status === ProjectStatusEnum.Hold
                    ? ProjectStatusEnum.Active
                    : ProjectStatusEnum.Hold
              })
            }
          }
        ]
      : [])
  ]

  const menuItems = [
    ...editMenuItems,

    ...(canRecommendProject(user, project)
      ? [
          {
            label: project?.recommended
              ? t('shared.actions.unrecommend')
              : t('shared.actions.recommend'),
            icon: project?.recommended ? <GiThumbDown /> : <GiThumbUp />,
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation()
              updateProjectStatus.mutate({
                id: project?._id,
                recommended: !project?.recommended
              })
            }
          }
        ]
      : []),
    ...(canDeleteProject(user, project)
      ? [
          {
            label: t('shared.actions.delete'),
            icon: <BiTrash />,
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation()
              setShowDeleteModal(true)
            }
          }
        ]
      : [])
  ]

  const handleClick = () => {
    if (status === ProjectStatusEnum.Hold) {
      router.push(
        constructLink(navigationLinks.projects.viewProject(project?._id), {
          [SEARCH_PARAM_KEYS.OWNER_KEY]: isPopulated<User>(project?.owner)
            ? project?.owner?._id
            : project?.owner,
          [SEARCH_PARAM_KEYS.STATUS_KEY]: status,
          [SEARCH_PARAM_KEYS.COMPANY_KEY]: isPopulated<Company>(
            project?.company
          )
            ? project?.company?._id
            : project?.company
        })
      )
    } else {
      router.push(
        constructLink(navigationLinks.projects.viewProject(project?._id), {
          [SEARCH_PARAM_KEYS.OWNER_KEY]: isPopulated<User>(project?.owner)
            ? project?.owner?._id
            : ''
        })
      )
    }
  }

  return (
    <Flex className='flex-col rounded-lg border border-neutral-500/70 shadow-lg md:flex-row'>
      {/* Left Side - Image Section */}
      <Box className='relative min-h-[300px] md:min-h-[0] md:w-[65%]'>
        <DeleteModal
          onDelete={handleDeleteProject}
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          itemName='This Project'
          loading={deleteProject.isPending}
        />

        <Box
          onClick={handleClick}
          style={{
            minHeight: 'inherit'
          }}
          className='relative h-full w-full cursor-pointer overflow-hidden'
        >
          {project?.media?.[0]?.type?.includes('video') ? (
            <video
              src={project?.media?.[0]?.url}
              className='h-full w-full rounded-lg object-cover'
              autoPlay
            >
              Your browser does not support HTML video.
              <track kind='captions' />
            </video>
          ) : (
            <Image
              fill
              src={project?.media?.[0]?.url}
              alt='project'
              className='h-full w-full rounded-l-lg object-cover'
            />
          )}

          <Badge
            size='xl'
            pos='absolute'
            variant='gradient'
            gradient={{ from: '#041A47', to: '#0A3FAD', deg: 90 }}
            className='-right-1 top-3 rounded-md px-3 py-1 text-sm uppercase text-white'
          >
            {moment(project?.handOverDate).isSameOrAfter(moment())
              ? t('projects.projectCard.completionStatus.ready')
              : t('projects.projectCard.completionStatus.offPlan')}
          </Badge>
        </Box>

        {/* Actions */}
        {menuItems.length > 0 && (
          <Actions
            withinPortal={false}
            items={menuItems}
            targetTrigger={
              <ActionIcon
                onClick={(e) => e.stopPropagation()}
                className='absolute left-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-default-background shadow-lg'
              >
                {menuActionsLoading ? (
                  <Loader size='xs' />
                ) : (
                  <BsThreeDots className='text-neutral-600' />
                )}
              </ActionIcon>
            }
          />
        )}
      </Box>

      <Box className='block w-full cursor-pointer' onClick={handleClick}>
        {/* Right Side - Content Section */}
        <Box className='w-full space-y-2 p-4'>
          {/* Header */}
          <Stack>
            <Text
              component='h2'
              className='line-clamp-1 text-lg font-semibold capitalize text-neutral-700'
            >
              {project?.title}
            </Text>
            <Text component='span' className='font-semibold text-primary'>
              {project?.startingPrice
                ? `AED ${formatNumberToShortForm(project?.startingPrice)}`
                : 'AED 0'}
            </Text>
          </Stack>

          {/* Location */}
          <Flex className='items-center gap-1 text-neutral-500'>
            <Image
              src={
                isDark(colorScheme)
                  ? navigationLinks.assets.locationDark
                  : navigationLinks.assets.location
              }
              width={12}
              height={14}
              alt='location'
              className='dark:brightness-200'
            />
            <Text className='line-clamp-2 text-xs'>
              {project?.location?.address || 'Unknown'}
            </Text>
          </Flex>

          {/* Handover and Payment Plan */}
          <Flex className='gap-4 text-xs text-neutral-500'>
            <Box>
              <Text className='text-sm font-medium'>
                {t('projects.projectCard.handoverDate')}
              </Text>
              <Text className='text-xs font-semibold'>{`${t(`projects.projectCard.q${Math.ceil((moment(project?.handOverDate).month() + 1) / 3)}`)} ${moment(project?.handOverDate).year()}`}</Text>
            </Box>
            <Box>
              <Text className='text-sm font-medium'>
                {t('projects.projectCard.paymentPlan.title')}
              </Text>
              <Text className='text-xs font-semibold'>
                {project?.paymentPlan?.fullPrice
                  ? t('projects.projectCard.paymentPlan.fullPrice')
                  : t('projects.projectCard.paymentPlan.projectCompletion')}
              </Text>
            </Box>
          </Flex>
          {/* Details */}
          {canSeeInteractions(user, project) && (
            <>
              <Text className='my-2 text-sm font-semibold text-neutral-700'>
                {t('projects.projectCard.details')}
              </Text>
              <Group>
                <Details
                  title={t('projects.projectCard.views')}
                  value={Number(project?.interaction?.views || 0)}
                />
                <Details
                  title={t('projects.projectCard.visitors')}
                  value={Number(project?.interaction?.visitors || 0)}
                />
                <Details
                  title={t('projects.projectCard.impressions')}
                  value={Number(project?.interaction?.impressions || 0)}
                />
              </Group>
            </>
          )}
        </Box>
      </Box>
    </Flex>
  )
}

export default ProjectCard
