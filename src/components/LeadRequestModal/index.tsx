import React, { useState } from 'react'
import { LeadsStatusEnum, Property, User } from '@commonTypes'
import { isPopulated } from '@guards'
import { useGetLeadById, useUpdateLead } from '@hooks'
import { Button, Group, Skeleton, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import moment from 'moment'
import { useTranslations } from 'next-intl'

import AgentCard from '@components/AgentCard'
import PrimaryButton from '@components/Buttons/PrimaryButton'
import FullScreenError from '@components/FullScreenError'
import LeadClientContactDetailsModal from '@components/LeadClientContactDetailsModal'
import AppModal from '@components/Modals/AppModal'
import PropertyCard from '@components/PropertyCard'
import { appNotifications } from '@utils'

function LeadRequestModalSkeleton() {
  return (
    <Stack>
      <Skeleton height={20} width='60%' />
      <Skeleton height={120} />
      <Skeleton height={100} />
      <Group>
        <Skeleton height={50} width='48%' />
        <Skeleton height={50} width='48%' />
      </Group>
    </Stack>
  )
}

export interface LeadRequestModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  leadId: string
}

function LeadRequestModal({
  openModal,
  setOpenModal,
  leadId
}: LeadRequestModalProps) {
  const t = useTranslations()
  const [openClientModal, setOpenClientModal] = useState(false)

  const isMobile = useMediaQuery('(max-width: 768px)')
  const { data, isError, error, isLoading } = useGetLeadById({
    id: leadId,
    showFields: {
      user: true,
      property: {
        createdBy: true,
        amenities: {
          basic: true
        }
      }
    }
  })

  const leadData = data?.lead

  const property = isPopulated<Property>(leadData?.property)
    ? leadData?.property
    : null
  const propertyOwner =
    property && 'createdBy' in property && isPopulated<User>(property.createdBy)
      ? property.createdBy
      : null

  const updateLead = useUpdateLead({
    onSuccess: () => {
      setOpenModal(false)
      appNotifications.success(t('leads.modal.messages.success.leadApproved'))
    }
  })

  const handleApproveClick = () => {
    if (
      leadData?.userContactDetails?.email !== '-' ||
      leadData?.userContactDetails?.phone !== '-'
    ) {
      updateLead.mutate({ id: leadId, status: LeadsStatusEnum.Approved })
    } else {
      setOpenClientModal(true)
    }
  }

  if (isLoading) {
    return <LeadRequestModalSkeleton />
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <AppModal
      open={openModal}
      setOpen={setOpenModal}
      size='100%'
      title={t('leads.modal.title')}
    >
      <LeadClientContactDetailsModal
        setOpenApprovalModal={setOpenModal}
        open={openClientModal}
        setOpen={setOpenClientModal}
        leadId={leadId}
      />
      <Stack>
        <Text size='sm' className='text-neutral-500'>
          {t('leads.modal.messages.leadAt')}

          {moment(leadData?.createdAt).format('MMMM Do YYYY, h:mm A')}
        </Text>
        {property && propertyOwner && (
          <PropertyCard
            layout={isMobile ? 'vertical' : 'horizontal'}
            property={{ ...property, createdBy: propertyOwner }}
          />
        )}

        {leadData?.user && (
          <AgentCard
            name={!isPopulated<User>(leadData?.user) ? '' : leadData.user.name}
            agentRole={
              !isPopulated<User>(leadData?.user) ? '' : leadData.user.role
            }
            avatar={
              !isPopulated<User>(leadData?.user)
                ? ''
                : leadData.user.image || ''
            }
          />
        )}
        <Group>
          <Button
            onClick={() => setOpenModal(false)}
            type='button'
            variant='light'
            color='gray'
            className='w-full rounded-lg font-semibold text-primary md:flex-1'
            size='lg'
          >
            {t('leads.modal.buttons.close')}
          </Button>
          <PrimaryButton
            loading={updateLead.isPending}
            onClick={handleApproveClick}
            type='submit'
            size='lg'
            className='w-full rounded-lg font-semibold text-secondary md:flex-1'
          >
            {t('leads.modal.buttons.approve')}
          </PrimaryButton>
        </Group>
      </Stack>
    </AppModal>
  )
}

export default LeadRequestModal
