'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { MediaTypes, PropertyStatusEnum, SaleTypeEnum } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import {
  useAddPropertySave,
  useDeleteProperty,
  useDeletePropertySave,
  useGetUserPermissions,
  useLinkConstructor,
  useUpdateProperty
} from '@hooks'
import { ActionIcon, Box, Loader } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiTrash } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import {
  FaEye,
  FaEyeSlash,
  FaHeart,
  FaRegHeart,
  FaThumbsUp
} from 'react-icons/fa'
import { PiPencilCircleLight } from 'react-icons/pi'

import Actions from '@components/Actions'
import DeleteModalWithReason from '@components/Modals/DeleteModalWithReason'
import type { PropertyCardProps } from '@components/PropertyCard'
import { appNotifications, cn } from '@utils'

import PropertyBadge from './PropertyBadge'

function PropertyThumbnail({
  layout,
  property,
  topLeftComponent
}: PropertyCardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { user, permissions } = useGetUserPermissions(Modules.PROPERTIES)
  const { constructLink } = useLinkConstructor()
  const { canSaveProperty, canDeleteProperty, canEditProperty } = permissions
  const addPropertySave = useAddPropertySave({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.savedSuccessfully', {
          item: t('properties.property')
        })
      )
    }
  })

  const deletePropertySave = useDeletePropertySave({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.unsavedSuccessfully', {
          item: t('properties.property')
        })
      )
    }
  })

  const updatePropertyStatus = useUpdateProperty({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.statusUpdatedSuccessfully', {
          item: t('properties.property')
        })
      )
    }
  })

  const handleToggleSavedProperty = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (property?.isSavedByMe) deletePropertySave.mutate({ id: property?._id })
    else addPropertySave.mutate({ property: property?._id })
  }

  const deleteProperty = useDeleteProperty({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('properties.property')
        })
      )
    }
  })

  const handleDeleteProperty = (reasonDelete: string) => {
    deleteProperty.mutate({
      id: property?._id,
      reasonDelete
    })
    setShowDeleteModal(false)
  }

  const menuActionsLoading = useMemo(() => {
    return updatePropertyStatus.isPending
  }, [updatePropertyStatus.isPending])

  // actions
  const editMenuItems = canEditProperty(user, property)
    ? [
        {
          label: t('shared.actions.edit'),
          icon: <PiPencilCircleLight />,
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation()
            router.push(
              constructLink(
                navigationLinks.properties.editProperty(property?._id)
              )
            )
          }
        },
        {
          label:
            property?.status === PropertyStatusEnum.Inactive
              ? t('shared.actions.activate')
              : t('shared.actions.deactivate'),
          icon:
            property?.status === PropertyStatusEnum.Inactive ? (
              <FaEye />
            ) : (
              <FaEyeSlash />
            ),
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation()
            updatePropertyStatus.mutate({
              id: property?._id,
              status:
                property?.status === PropertyStatusEnum.Inactive
                  ? PropertyStatusEnum.Active
                  : PropertyStatusEnum.Inactive
            })
          }
        }
      ]
    : []
  const deleteMenuItems = canDeleteProperty(user, property)
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
    : []
  const recommendedMenuItems =
    property?.status === PropertyStatusEnum.Active &&
    canEditProperty(user, property)
      ? [
          {
            label: t('shared.actions.recommend'),
            icon: <FaThumbsUp />,
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation()
              router.push(navigationLinks.subscription.credits)
            }
          }
        ]
      : []
  const menuItems = [
    ...editMenuItems,
    ...deleteMenuItems,
    ...recommendedMenuItems
  ]

  let content = null

  if (
    property?.media?.[0]?.url &&
    property?.media[0]?.type === MediaTypes.Video
  ) {
    content = (
      <video
        src={property?.media?.[0]?.url}
        className='h-full w-full object-cover'
        autoPlay
        muted
        loop
        playsInline
      />
    )
  } else if (
    property?.media?.[0]?.url &&
    property?.media[0]?.type === MediaTypes.Image
  ) {
    content = (
      <Image
        src={property?.media?.[0]?.url}
        alt={property?.title || 'Media'}
        layout='fill'
        objectFit='cover'
        priority
      />
    )
  } else {
    content = (
      <div className='flex h-full w-full items-center justify-center'>
        <p className='text-neutral-500'>No media available</p>
      </div>
    )
  }

  const ThumbnailBottomRightComponent = useMemo(() => {
    if (canSaveProperty) {
      if (deletePropertySave.isPending || addPropertySave.isPending) {
        return <Loader size='xs' />
      }
      if (property?.isSavedByMe) {
        return <FaHeart className='text-error-500' size={16} />
      }
      return <FaRegHeart className='text-neutral-500' size={16} />
    }
    return null
  }, [
    deletePropertySave.isPending,
    addPropertySave.isPending,
    property?.isSavedByMe,
    canSaveProperty
  ])

  return (
    <>
      <DeleteModalWithReason
        open={showDeleteModal}
        loading={deleteProperty.isPending}
        setOpen={setShowDeleteModal}
        itemName={t('properties.property')}
        onDelete={(reasonDelete) => handleDeleteProperty(reasonDelete)}
        defaultReasons={[
          t('properties.deleteModal.defaultReasons.1'),
          t('properties.deleteModal.defaultReasons.2'),
          t('properties.deleteModal.defaultReasons.3')
        ]}
      />
      <Box
        className={cn(
          'relative cursor-pointer overflow-hidden rounded-lg',
          layout === 'vertical' ? 'h-60 w-full' : 'w-1/2'
        )}
      >
        {content}
        {/* Show actions for the owner  */}
        {topLeftComponent ||
          (menuItems.length > 0 && (
            <Actions
              withinPortal={false}
              items={menuItems}
              targetTrigger={
                <ActionIcon
                  onClick={(e) => e.stopPropagation()}
                  className='absolute end-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-default-background shadow-lg'
                >
                  {menuActionsLoading ? (
                    <Loader size='xs' />
                  ) : (
                    <BsThreeDots className='text-neutral-600' />
                  )}
                </ActionIcon>
              }
            />
          ))}

        {/* Heart Icon */}
        {canSaveProperty &&
          pathname !== navigationLinks.properties.addXml &&
          pathname !== navigationLinks.admin.properties.xmlRequests && (
            <ActionIcon
              onClick={handleToggleSavedProperty}
              className={cn(
                'absolute bottom-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-default-background shadow-lg',
                property?.recommended ? 'start-3' : 'end-3'
              )}
            >
              {ThumbnailBottomRightComponent}
            </ActionIcon>
          )}

        <PropertyBadge property={property} />
        <span
          style={{
            background: `linear-gradient(90deg, #041A47 0%, #0A3FAD 100%)`
          }}
          className='absolute -right-1 top-2 rounded-l-lg px-3 py-1 text-sm uppercase text-white'
        >
          {property?.type === SaleTypeEnum.Sale
            ? t('shared.fields.propertyType.for') +
              t('shared.fields.propertyType.sale')
            : t('shared.fields.propertyType.for') +
              t('shared.fields.propertyType.rent')}
        </span>
      </Box>
    </>
  )
}

export default PropertyThumbnail
