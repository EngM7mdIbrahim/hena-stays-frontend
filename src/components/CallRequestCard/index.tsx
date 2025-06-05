import React, { useState } from 'react'
import { GetAllCallRequestsResponse } from '@commonTypes'
import {
  ActionIcon,
  Avatar,
  Box,
  Card,
  Flex,
  Group,
  Skeleton,
  Stack,
  Text
} from '@mantine/core'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale, useTranslations } from 'next-intl'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'

import Actions from '@components/Actions'
import CallRequestModal from '@components/CallRequestModal'

export function CallRequestCardSkeleton() {
  return (
    <Card
      className='cursor-pointer space-y-4 border border-neutral-200'
      shadow='sm'
      padding='lg'
      radius='md'
    >
      <Stack className='gap-4'>
        <Group>
          <Skeleton height={40} circle />
          <Box>
            <Skeleton height={20} width={120} />
          </Box>
        </Group>

        <Skeleton height={16} width='80%' />
        <Skeleton height={16} width='70%' />
        <Skeleton height={16} width='90%' />
        <Skeleton height={16} width='60%' />
      </Stack>
    </Card>
  )
}

export interface CallRequestProps {
  request: GetAllCallRequestsResponse['items'][number]
}

function CallRequest({ request }: CallRequestProps) {
  const [openModal, setOpenModal] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const menuItems = [
    {
      label: t('callRequests.actions.viewRequest'),
      icon: <FaEye />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpenModal(true)
      }
    }
  ]

  return (
    <>
      {openModal && (
        <CallRequestModal
          id={request._id}
          status={request.status}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      <Card
        className='space-y-4 border border-neutral-200'
        shadow='sm'
        padding='lg'
        radius='md'
      >
        <Flex align='center' justify='space-between'>
          <Group>
            <Avatar src={null} name={request.name} radius='xl' />
            <Box>
              <Text fw={500} className='text-sm capitalize md:text-base'>
                {request.name}
              </Text>
            </Box>
          </Group>
          <Actions
            withinPortal={false}
            items={menuItems}
            targetTrigger={
              <ActionIcon radius='xl' variant='subtle' color='gray' size='lg'>
                <BsThreeDotsVertical cursor='pointer' size={20} />
              </ActionIcon>
            }
          />
        </Flex>

        <Text size='sm' className='text-neutral-500'>
          {t('shared.fields.email')}: {request.email}
        </Text>

        <Text size='sm' className='text-neutral-500'>
          {t('shared.fields.phoneNumber')}: {request.phone}
        </Text>

        <Text size='sm' className='text-neutral-500'>
          {t('leads.card.contactType')}:{' '}
          {request?.contactMethods
            ? Object.keys(request.contactMethods)
                .filter((method) => {
                  const key = method as keyof typeof request.contactMethods
                  return request.contactMethods?.[key]
                })
                .map(
                  (method) => method.charAt(0).toUpperCase() + method.slice(1)
                )
                .join(', ') || '-'
            : '-'}
        </Text>

        <Text size='sm' className='text-neutral-500'>
          {t('callRequests.registeredOn')}:{' '}
          {moment(request.createdAt)
            .locale(locale)
            .format(
              locale.startsWith('ar')
                ? 'D MMMM YYYY h:mm A'
                : 'MMMM D, YYYY h:mm A'
            )}
        </Text>
      </Card>
    </>
  )
}

export default CallRequest
