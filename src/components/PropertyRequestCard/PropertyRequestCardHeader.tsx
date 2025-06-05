import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { RequestBuyProperty, SubCategory } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { isDark, isPopulated } from '@guards'
import {
  useDeleteBuyPropertyRequest,
  useGetUserPermissions,
  useLinkConstructor
} from '@hooks'
import {
  ActionIcon,
  Flex,
  Stack,
  Text,
  useMantineColorScheme
} from '@mantine/core'
import { useTranslations } from 'next-intl'
import { BiTrash } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { PiPencilCircleLight } from 'react-icons/pi'

import Actions from '@components/Actions'
import DeleteModalWithReason from '@components/Modals/DeleteModalWithReason'
import { appNotifications, formatNumberToShortForm } from '@utils'

export default function PropertyRequestCardHeader({
  request
}: {
  request: RequestBuyProperty
}) {
  const t = useTranslations()
  const { user, permissions } = useGetUserPermissions(
    Modules.BUY_PROPERTY_REQUESTS
  )
  const { canEditBuyPropertyRequest, canDeletedBuyPropertyRequest } =
    permissions
  const { colorScheme } = useMantineColorScheme()
  const { constructLink } = useLinkConstructor()
  const router = useRouter()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const deleteRequest = useDeleteBuyPropertyRequest({
    onSuccess: () => {
      setOpenDeleteModal(false)
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('buyPropertyRequests.buyPropertyRequest')
        })
      )
    }
  })

  const handleDelete = (reasonDelete: string) => {
    deleteRequest?.mutate({
      id: request?._id,
      reasonDelete
    })
  }

  const editMenuItem = canEditBuyPropertyRequest(user, request)
    ? [
        {
          label: t('shared.actions.edit'),
          icon: <PiPencilCircleLight />,
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation()
            router.push(
              constructLink(
                navigationLinks.buyPropertyRequests.editBuyPropertyRequests(
                  request?._id
                )
              )
            )
          }
        }
      ]
    : []

  const deleteMenuItem = canDeletedBuyPropertyRequest(user, request)
    ? [
        {
          label: t('shared.actions.delete'),
          icon: <BiTrash />,
          onClick: () => setOpenDeleteModal(true)
        }
      ]
    : []

  const menuItems = [...editMenuItem, ...deleteMenuItem]
  return (
    <Flex justify='space-between' className='flex-wrap gap-2'>
      <DeleteModalWithReason
        open={openDeleteModal}
        loading={deleteRequest?.isPending}
        setOpen={setOpenDeleteModal}
        itemName={t('buyPropertyRequests.buyPropertyRequest')}
        onDelete={(reasonDelete) => handleDelete(reasonDelete)}
        defaultReasons={[
          t('properties.deleteModal.defaultReasons.1'),
          t('properties.deleteModal.defaultReasons.2'),
          t('properties.deleteModal.defaultReasons.3')
        ]}
      />
      <Stack className='gap-2'>
        <Flex className='items-start justify-between gap-2'>
          <Flex className='flex-1 items-start gap-2'>
            <Image
              src={
                isDark(colorScheme)
                  ? navigationLinks.assets.locationDark
                  : navigationLinks.assets.location
              }
              width={15}
              height={15}
              alt='location'
              className='mt-1 flex-shrink-0 dark:brightness-200'
            />
            <Stack className='flex-1 gap-1'>
              <Text className='line-clamp-1 text-base text-default-text'>
                {request?.location?.address}
              </Text>
              {isPopulated<SubCategory>(request?.subCategory) && (
                <Text className='text-base' c='dimmed'>
                  {request?.subCategory.name}
                </Text>
              )}
            </Stack>
          </Flex>
          {menuItems.length > 0 && (
            <Actions
              withinPortal={false}
              items={menuItems}
              targetTrigger={
                <ActionIcon
                  onClick={(e) => e.stopPropagation()}
                  className='flex h-10 w-fit cursor-pointer items-center justify-center bg-transparent px-4'
                >
                  <BsThreeDots size={20} className='text-neutral-600' />
                </ActionIcon>
              }
            />
          )}
        </Flex>
      </Stack>
      <Flex justify='space-between' align='center' className='w-full gap-2'>
        <Text className='text-xl font-bold text-primary'>{request?.type}</Text>
        {isPopulated<RequestBuyProperty['price']>(request?.price) && (
          <Text className='text-lg font-semibold text-default-text'>
            {formatNumberToShortForm(request?.price.from)} -{' '}
            {formatNumberToShortForm(request?.price.to)}{' '}
            {request?.price.currency}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}
