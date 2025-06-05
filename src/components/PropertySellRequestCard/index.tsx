'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RequestSellProperty } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import {
  useDeleteSellPropertyRequest,
  useGetUserPermissions,
  useLinkConstructor
} from '@hooks'
import { ActionIcon, Card, Skeleton, Stack, Text } from '@mantine/core'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import { BiTrash } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { PiPencilCircleLight } from 'react-icons/pi'

import Actions from '@components/Actions'
import DeleteModalWithReason from '@components/Modals/DeleteModalWithReason'
import { appNotifications } from '@utils'

import PropertySellRequestCardDetails from './PropertySellRequestCardDetails'
import PropertySellRequestCardFeatures from './PropertySellRequestCardFeatures'
import PropertySellRequestCardHeader from './PropertySellRequestCardHeader'

export function PropertySellRequestCardSkeleton() {
  return (
    <Card withBorder shadow='sm' padding='lg' radius='md'>
      <Stack gap='md'>
        <Skeleton height={40} mt='md' radius='md' width='100%' />
        <Skeleton height={20} mt='md' radius='md' width='25%' />
        <Skeleton height={30} mt={6} radius='md' width='100%' />
        <Skeleton height={10} mt={6} radius='md' width='25%' />
        <Skeleton height={30} mt={6} radius='md' width='100%' />
      </Stack>
    </Card>
  )
}

export interface PropertySellRequestCardProps extends RequestSellProperty {}

function PropertySellRequestCard(request: PropertySellRequestCardProps) {
  const t = useTranslations()
  const router = useRouter()
  const { createdAt, _id } = request
  const { user, permissions } = useGetUserPermissions(
    Modules.SELL_PROPERTY_REQUESTS
  )
  const { canEditSellPropertyRequest, canDeletedSellPropertyRequest } =
    permissions
  const { constructLink } = useLinkConstructor()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const deleteRequest = useDeleteSellPropertyRequest({
    onSuccess: () => {
      setOpenDeleteModal(false)
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('buyPropertyRequests.buyPropertyRequestsForm.request')
        })
      )
    }
  })

  const handleDelete = (reasonDelete: string) => {
    deleteRequest.mutate({
      id: _id,
      reasonDelete
    })
  }

  const menuItems = [
    ...(canEditSellPropertyRequest(user, request)
      ? [
          {
            label: t('shared.actions.edit'),
            icon: <PiPencilCircleLight />,
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation()
              router.push(
                constructLink(
                  navigationLinks.sellPropertyRequests.editSellPropertyRequests(
                    _id
                  )
                )
              )
            }
          }
        ]
      : []),
    ...(canDeletedSellPropertyRequest(user, request)
      ? [
          {
            label: t('shared.actions.delete'),
            icon: <BiTrash />,
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation()

              setOpenDeleteModal(true)
            }
          }
        ]
      : [])
  ]

  return (
    <>
      <DeleteModalWithReason
        open={openDeleteModal}
        loading={deleteRequest.isPending}
        setOpen={setOpenDeleteModal}
        itemName={t('buyPropertyRequests.buyPropertyRequestsForm.request')}
        onDelete={(reasonDelete) => handleDelete(reasonDelete)}
        defaultReasons={[
          t('properties.deleteModal.defaultReasons.1'),
          t('properties.deleteModal.defaultReasons.2'),
          t('properties.deleteModal.defaultReasons.3')
        ]}
      />
      <Card
        onClick={() =>
          router.push(
            navigationLinks.sellPropertyRequests.viewSellPropertyRequest(_id)
          )
        }
        className='relative flex h-full cursor-pointer flex-col border border-neutral-200'
        shadow='sm'
        padding='lg'
        radius='lg'
        withBorder
      >
        <Stack className='flex-grow' gap='md'>
          {menuItems.length > 0 && (
            <Actions
              withinPortal={false}
              items={menuItems}
              targetTrigger={
                <ActionIcon
                  onClick={(e) => e.stopPropagation()}
                  className='flex h-4 w-fit cursor-pointer items-center justify-end self-end bg-transparent px-4'
                >
                  <BsThreeDots size={20} className='text-neutral-600' />
                </ActionIcon>
              }
            />
          )}
          <PropertySellRequestCardHeader {...request} />
          <Text>
            {t('properties.propertyView.addedOn')}{' '}
            {moment(createdAt).format('DD/MM/YYYY')}
          </Text>
          <PropertySellRequestCardFeatures {...request} />
          <PropertySellRequestCardDetails {...request} />
        </Stack>
      </Card>
    </>
  )
}

export default PropertySellRequestCard
