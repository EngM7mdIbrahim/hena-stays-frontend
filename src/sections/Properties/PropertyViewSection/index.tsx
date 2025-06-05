'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PropertyStatusEnum, RentDurationEnum, User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { isPopulated } from '@guards'
import {
  useDeleteProperty,
  useGetPropertyById,
  useGetUserPermissions,
  useLinkConstructor
} from '@hooks'
import {
  ActionIcon,
  Flex,
  Group,
  ScrollArea,
  Skeleton,
  Stack,
  Text
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import PropertyDescription from '@sections/Properties/PropertyViewSection/PropertyDescription'
import PropertyLocation from '@sections/Properties/PropertyViewSection/PropertyLocation'
import PropertyRegInformation from '@sections/Properties/PropertyViewSection/PropertyRegInformation'
import { useTranslations } from 'next-intl'
import { BiTrashAlt } from 'react-icons/bi'
import { FaRegEdit } from 'react-icons/fa'

import AgentCard from '@components/AgentCard'
import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import Breadcrumb from '@components/Breadcrumb'
import FullScreenError from '@components/FullScreenError'
import ImageGalleryDesktop from '@components/ImageGallery/ImagesGalleryDesktop'
import ImageGalleryMobile from '@components/ImageGallery/ImagesGalleryMobile'
import ImageGalleryModal from '@components/ImageGallery/ImagesGalleryModal'
import AppModal from '@components/Modals/AppModal'
import DeleteModalWithReason from '@components/Modals/DeleteModalWithReason'
import ShareModal from '@components/Modals/ShareModal'
import { appNotifications } from '@utils'

export function PropertyViewSectionLoading() {
  return (
    <Stack className='gap-6 py-10'>
      <Skeleton height={500} width='100%' />
      <Group className='justify-between'>
        <Skeleton height={20} width={100} />
        <Skeleton height={20} width={100} />
      </Group>
      <Group className='items-start justify-between'>
        <Stack>
          <Flex className='gap-4'>
            <Skeleton height={20} width={200} />
            <Skeleton height={20} width={200} />
            <Skeleton height={20} width={200} />
          </Flex>
          <Skeleton height={500} width='100%' />
        </Stack>
        <Skeleton height={250} width={250} />
      </Group>
    </Stack>
  )
}
export interface PropertyViewSectionProps {
  propertyId: string
}

function PropertyViewSection({ propertyId }: PropertyViewSectionProps) {
  const t = useTranslations()
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openShareModal, setOpenShareModal] = useState(false)

  const [currIndex, setCurrIndex] = useState<number | null>(null)
  const [currentSelected, setCurrentSelected] = useState<string>('description')
  const { permissions, user } = useGetUserPermissions(Modules.PROPERTIES)
  const { canEditProperty, canDeleteProperty } = permissions
  const { constructLink } = useLinkConstructor()

  const getProperty = useGetPropertyById({
    id: propertyId,
    showFields: {
      createdBy: {
        company: true
      },
      subCategory: true,
      amenities: {
        basic: true
      }
    }
  })
  const property = getProperty?.data?.property

  const list = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },
    {
      label: t('shared.breadcrumb.properties'),
      link: navigationLinks.properties.allProperties
    },
    {
      label: property?.title || t('shared.breadcrumb.propertyView'),
      link: navigationLinks.properties.viewProperty(propertyId)
    }
  ]

  const deleteProperty = useDeleteProperty({
    onSuccess: () => {
      appNotifications.success('Property Deleted Successfully')
      router.push(navigationLinks.properties.myListings)
    }
  })

  const handleDeleteProperty = (reasonDelete: string) => {
    deleteProperty.mutate({
      id: propertyId,
      reasonDelete
    })
    setOpenDeleteModal(false)
  }

  const handleMovingBetweenTabs = (tab: string) => {
    setCurrentSelected(tab)
  }
  let content = null

  if (currentSelected === 'description') {
    content = <PropertyDescription property={property} />
  } else if (currentSelected === 'location') {
    content = <PropertyLocation property={property} />
  } else if (currentSelected === 'regulatory-information') {
    content = <PropertyRegInformation property={property} />
  }

  let duration = null
  if (property?.price?.duration === RentDurationEnum.Daily) {
    duration = t('shared.fields.duration.daily')
  } else if (property?.price?.duration === RentDurationEnum.Monthly) {
    duration = t('shared.fields.duration.monthly')
  } else if (property?.price?.duration === RentDurationEnum.Yearly) {
    duration = t('shared.fields.duration.yearly')
  }

  if (getProperty.isLoading) {
    return <PropertyViewSectionLoading />
  }

  if (getProperty.isError) {
    return <FullScreenError error={getProperty.error} />
  }

  return (
    <>
      <Breadcrumb className='gap-2 md:gap-0' list={list} />
      <Stack className='gap-6'>
        <DeleteModalWithReason
          open={openDeleteModal}
          loading={deleteProperty.isPending}
          setOpen={setOpenDeleteModal}
          itemName={t('properties.property')}
          onDelete={(reasonDelete) => handleDeleteProperty(reasonDelete)}
          defaultReasons={[
            t('properties.deleteModal.defaultReasons.1'),
            t('properties.deleteModal.defaultReasons.2'),
            t('properties.deleteModal.defaultReasons.3')
          ]}
        />
        {property?.media && property?.media?.length > 0 && (
          <>
            <AppModal
              size='xl'
              title={t('shared.fields.media', {
                itemName: t('properties.property')
              })}
              open={currIndex !== null}
              setOpen={() => setCurrIndex(null)}
            >
              <ImageGalleryModal
                defaultIndex={currIndex || 0}
                images={property?.media || []}
              />
            </AppModal>
            {isMobile ? (
              <ImageGalleryMobile images={property?.media || []} />
            ) : (
              <ImageGalleryDesktop
                handleClick={setCurrIndex}
                images={property?.media || []}
              />
            )}
          </>
        )}

        <Group className='justify-between'>
          <Text className='text-lg font-semibold text-neutral-600'>
            {t('properties.propertyView.startFrom')}
            <br />
            <Text
              component='span'
              className='text-xl font-semibold text-default-text md:text-2xl'
            >
              {property?.price?.currency}{' '}
              {property?.price?.value?.toLocaleString()} {duration}
            </Text>
          </Text>
          <ActionIcon.Group className='gap-4'>
            {/* the edit and delete will appear only if the user is the owner */}
            {canEditProperty(user, property) && (
              <ActionIcon
                component={Link}
                href={constructLink(
                  navigationLinks.properties.editProperty(propertyId)
                )}
                variant='default'
                className='items-center rounded-full bg-default-background text-neutral-700'
                size='lg'
                aria-label='Edit Property'
              >
                <FaRegEdit />
              </ActionIcon>
            )}
            {canDeleteProperty(user, property) && (
              <ActionIcon
                onClick={() => setOpenDeleteModal(true)}
                variant='default'
                className='rounded-full bg-default-background text-neutral-700'
                size='lg'
                aria-label='Delete Property'
              >
                <BiTrashAlt />
              </ActionIcon>
            )}
            {property?.status === PropertyStatusEnum.Active && (
              <ShareModal
                open={openShareModal}
                setOpen={setOpenShareModal}
                linkToCopy={`${window.location}`}
              />
            )}
          </ActionIcon.Group>
        </Group>

        <Flex className='flex-col-reverse justify-between gap-4 py-10 md:flex-row'>
          <Stack className='md:w-[60%]'>
            <ScrollArea offsetScrollbars>
              <AppFragmentTabsControl
                textColor='text-primary'
                notActiveBg='bg-neutral-50'
                value={currentSelected}
                onChange={handleMovingBetweenTabs}
                data={[
                  {
                    label: t('properties.propertyView.tabs.description'),
                    value: 'description'
                  },
                  {
                    label: t('properties.propertyView.tabs.location'),
                    value: 'location'
                  },
                  {
                    label: t(
                      'properties.propertyView.tabs.regulatoryInformation'
                    ),
                    value: 'regulatory-information'
                  }
                ]}
              />
            </ScrollArea>
            {content}
          </Stack>
          {/* this will appear if there is no user and if the user is the owner */}
          <AgentCard
            className='h-fit rounded-xl border border-neutral-200 p-6 shadow-xl'
            makeLead
            avatar={
              isPopulated<User>(property?.createdBy)
                ? property?.createdBy?.image || ''
                : ''
            }
            agentRole={
              isPopulated<User>(property?.createdBy)
                ? property?.createdBy?.role
                : ''
            }
            name={
              isPopulated<User>(property?.createdBy)
                ? property?.createdBy?.name
                : ''
            }
            property={property}
          />
        </Flex>
      </Stack>
    </>
  )
}

export default PropertyViewSection
