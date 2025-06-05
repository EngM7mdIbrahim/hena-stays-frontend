'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { isPopulated } from '@guards'
import {
  useDeleteSellPropertyRequest,
  useGetSellPropertyRequestById,
  useGetUserPermissions,
  useLinkConstructor
} from '@hooks'
import { ActionIcon, Flex, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { PropertyViewSectionLoading } from '@sections/Properties/PropertyViewSection'
import SellPropertyDescription from '@sections/SellPropertyRequest/SellPropertyViewSection/SellPropertyDescription'
import SellPropertyInformation from '@sections/SellPropertyRequest/SellPropertyViewSection/SellPropertyInformation'
import SellPropertyLocation from '@sections/SellPropertyRequest/SellPropertyViewSection/SellPropertyLocation'
import { useTranslations } from 'next-intl'
import { BiTrashAlt } from 'react-icons/bi'
import { FaRegEdit } from 'react-icons/fa'

import AgentCard from '@components/AgentCard'
import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import FullScreenError from '@components/FullScreenError'
import ImageGalleryDesktop from '@components/ImageGallery/ImagesGalleryDesktop'
import ImageGalleryMobile from '@components/ImageGallery/ImagesGalleryMobile'
import ImageGalleryModal from '@components/ImageGallery/ImagesGalleryModal'
import AppModal from '@components/Modals/AppModal'
import DeleteModalWithReason from '@components/Modals/DeleteModalWithReason'
import ShareModal from '@components/Modals/ShareModal'
import { appNotifications } from '@utils'

export interface SellPropertyViewSectionProps {
  requestId: string
}

function SellPropertyViewSection({ requestId }: SellPropertyViewSectionProps) {
  const t = useTranslations()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openShareModal, setOpenShareModal] = useState(false)

  const [currIndex, setCurrIndex] = useState<number | null>(null)
  const [currentSelected, setCurrentSelected] = useState<string>('description')
  const { user, permissions } = useGetUserPermissions(
    Modules.SELL_PROPERTY_REQUESTS
  )
  const { canDeletedSellPropertyRequest, canEditSellPropertyRequest } =
    permissions
  const { constructLink } = useLinkConstructor()

  const getSellRequest = useGetSellPropertyRequestById({
    id: requestId,
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
  const property = getSellRequest?.data?.requestSellProperty

  const deleteRequest = useDeleteSellPropertyRequest({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('sellPropertyRequests.sellPropertyRequest')
        })
      )
    }
  })

  const handleDeleteRequest = (reasonDelete: string) => {
    deleteRequest.mutate({
      id: requestId,
      reasonDelete
    })
    setOpenDeleteModal(false)
  }

  const handleMovingBetweenTabs = (tab: string) => {
    setCurrentSelected(tab)
  }
  let content = null

  if (currentSelected === 'description') {
    content = <SellPropertyDescription property={property} />
  } else if (currentSelected === 'location') {
    content = <SellPropertyLocation property={property} />
  } else if (currentSelected === 'information') {
    content = <SellPropertyInformation property={property} />
  }

  if (getSellRequest.isLoading) {
    return <PropertyViewSectionLoading />
  }

  if (getSellRequest.isError) {
    return <FullScreenError error={getSellRequest.error} />
  }

  return (
    <Stack className='gap-6'>
      <DeleteModalWithReason
        open={openDeleteModal}
        loading={deleteRequest.isPending}
        setOpen={setOpenDeleteModal}
        itemName={t('properties.property')}
        onDelete={handleDeleteRequest}
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
            {property?.price?.value?.toLocaleString()}{' '}
            {property?.price?.duration}
          </Text>
        </Text>
        <ActionIcon.Group className='gap-4'>
          {canEditSellPropertyRequest(user, property) && (
            <ActionIcon
              component={Link}
              href={constructLink(
                navigationLinks.sellPropertyRequests.editSellPropertyRequests(
                  requestId
                )
              )}
              variant='default'
              className='items-center rounded-full bg-default-background text-neutral-700'
              size='lg'
              aria-label='Edit Property'
            >
              <FaRegEdit />
            </ActionIcon>
          )}

          {canDeletedSellPropertyRequest(user, property) && (
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

          <ShareModal
            open={openShareModal}
            setOpen={setOpenShareModal}
            linkToCopy={`${window.location}`}
          />
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
                  value: 'information'
                }
              ]}
            />
          </ScrollArea>
          {content}
        </Stack>
        {/* this will appear if there is no user and if the user is the owner */}
        <AgentCard
          className='h-fit rounded-xl border border-neutral-200 p-6 shadow-xl'
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
  )
}

export default SellPropertyViewSection
