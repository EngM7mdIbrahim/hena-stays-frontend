import React from 'react'
import { useRouter } from 'next/navigation'
import { Leads, LeadsStatusEnum, Property, User } from '@commonTypes'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { isPopulated } from '@guards'
import { useGetUserPermissions } from '@hooks'
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Flex,
  Group,
  Skeleton,
  Stack,
  Text
} from '@mantine/core'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaCheck, FaEye } from 'react-icons/fa'

import Actions from '@components/Actions'
import LeadRequestModal from '@components/LeadRequestModal'

export function LeadCardSkeleton() {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Stack>
        <Skeleton height={24} width='60%' />
        <Group>
          <Skeleton height={16} width='40%' />
          <Skeleton height={24} width={80} />
        </Group>
        <Skeleton height={16} width='50%' />
        <Skeleton height={16} width='40%' />
        <Stack>
          <Skeleton height={16} width='60%' />
          <Skeleton height={16} width='50%' />
          <Skeleton height={16} width='50%' />
        </Stack>
      </Stack>
    </Card>
  )
}

export interface LeadCardProps {
  lead: Leads
}

const statusColors = {
  [LeadsStatusEnum.Approved]: 'green',
  [LeadsStatusEnum.Pending]: 'yellow',
  [LeadsStatusEnum.Rejected]: 'red'
}

function LeadCard({ lead }: LeadCardProps) {
  const router = useRouter()
  const t = useTranslations()
  const { permissions } = useGetUserPermissions(Modules.LEADS)
  const { canInteractWithLead } = permissions

  const [openModal, setOpenModal] = React.useState(false)

  const menuItems = [
    ...(canInteractWithLead
      ? [
          {
            label: t('leads.card.actions.approve'),
            icon: <FaCheck />,
            onClick: (e: React.MouseEvent) => {
              e.stopPropagation()
              setOpenModal(true)
            }
          }
        ]
      : []),

    {
      label: t('leads.card.actions.viewAgent'),
      icon: <FaEye />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        if (
          isPopulated<Property>(lead?.property) &&
          isPopulated<User>(lead?.property?.createdBy)
        ) {
          router?.push(
            navigationLinks.community.profile(lead?.property?.createdBy?._id)
          )
        }
      }
    },
    {
      label: t('leads.card.actions.viewProperty'),
      icon: <FaEye />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        if (isPopulated<Property>(lead?.property)) {
          router?.push(
            navigationLinks.properties.viewProperty(lead.property._id)
          )
        }
      }
    }
  ]

  return (
    <>
      {openModal && (
        <LeadRequestModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          leadId={lead?._id}
        />
      )}
      <Card
        className='border border-neutral-200'
        shadow='sm'
        padding='lg'
        radius='md'
      >
        <Stack>
          <Flex justify='space-between' align='center'>
            <Text className='text-xl font-semibold'>
              {isPopulated<Property>(lead.property) && lead.property.title}
            </Text>
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

          <Stack>
            <Group>
              <Text size='sm' className='text-neutral-500'>
                {t('leads.card.status')}:
              </Text>
              <Badge color={statusColors[lead?.status]}>{lead?.status}</Badge>
            </Group>
            <Text size='sm' className='capitalize text-neutral-500'>
              {t('leads.card.agent')}:{' '}
              {(isPopulated<Property>(lead?.property) &&
                isPopulated<User>(lead?.property?.createdBy) &&
                lead?.property?.createdBy?.name) ||
                '-'}
            </Text>
          </Stack>

          <Text size='sm' className='text-neutral-500'>
            {t('leads.card.leadName')}: {lead?.name}
          </Text>
          <Text size='sm' className='text-neutral-500'>
            {t('leads.card.contactType')}: {lead?.contactType}
          </Text>
          {lead?.user && isPopulated<User>(lead?.user) && (
            <Text size='sm' className='text-neutral-500'>
              {t('leads.card.clientName')}: {lead?.user?.name}
            </Text>
          )}
          <Box size='sm' className='text-neutral-500'>
            {t('leads.card.clientContactDetails')}:
            {lead?.userContactDetails?.email && (
              <Text component='p' size='sm' className='text-neutral-500'>
                {t('shared.fields.email')}: {lead.userContactDetails.email}
              </Text>
            )}
            {lead?.userContactDetails?.phone && (
              <Text component='p' size='sm' className='text-neutral-500'>
                {t('shared.fields.phoneNumber')}:{' '}
                {lead.userContactDetails.phone}
              </Text>
            )}
          </Box>

          <Text size='sm' className='text-neutral-500'>
            {t('leads.card.date')}:{' '}
            {moment(lead?.createdAt).format('MMMM Do YYYY, h:mm A')}
          </Text>
        </Stack>
      </Card>
    </>
  )
}

export default LeadCard
