import React, { useState } from 'react'
import { FindAllContactUsResponse } from '@commonTypes'
import { useDeleteContactUs } from '@hooks'
import { ActionIcon, Avatar, Box, Card, Flex, Group, Text } from '@mantine/core'
import moment from 'moment'

import 'moment/locale/ar'

import { useLocale, useTranslations } from 'next-intl'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEye, FaTrash } from 'react-icons/fa'

import Actions from '@components/Actions'
import ContactUsModal from '@components/ContactUsModal'
import DeleteModal from '@components/Modals/DeleteModal'
import { appNotifications } from '@utils'

export interface ContactUsAdminCardProps {
  request: FindAllContactUsResponse['items'][number]
}

function ContactUsAdminCard({ request }: ContactUsAdminCardProps) {
  const t = useTranslations()
  const locale = useLocale()
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { mutate, isPending } = useDeleteContactUs({
    onSuccess: () => {
      setOpenDeleteModal(false)
      appNotifications.success(
        t('successMessages.deletedSuccessfully', {
          item: t('buyPropertyRequests.buyPropertyRequestsForm.request')
        })
      )
    }
  })

  const menuItems = [
    {
      label: t('shared.actions.view'),
      icon: <FaEye />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpenModal(true)
      }
    },
    {
      label: t('shared.actions.delete'),
      icon: <FaTrash />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpenDeleteModal(true)
      }
    }
  ]

  return (
    <>
      {openModal && (
        <ContactUsModal
          id={request._id}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loading={isPending}
        onDelete={() => mutate({ id: request._id })}
      />
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
          {t('shared.fields.email')}:{' '}
          <Text
            component='a'
            href={`mailto:${request.email}`}
            size='sm'
            className='text-primary hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            {request.email}
          </Text>
        </Text>
        <Text size='sm' className='line-clamp-1 text-neutral-500'>
          {t('contactUsRequests.card.subject')}: {request.subject}
        </Text>

        <Text size='sm' className='text-neutral-500'>
          {t('contactUsRequests.card.sentOn')}:{' '}
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

export default ContactUsAdminCard
