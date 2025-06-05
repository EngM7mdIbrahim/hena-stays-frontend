import React, { useState } from 'react'
import { CallRequestStatus, CallRequestStatusType } from '@commonTypes'
import { useGetCallRequestById, useUpdateCallRequest } from '@hooks'
import { Button, Group, Skeleton, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import FullScreenError from '@components/FullScreenError'
import AppModal from '@components/Modals/AppModal'
import { appNotifications } from '@utils'

interface ConfirmationModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  message: string
  isPending: boolean
  onConfirm: () => void
}

function ConfirmationModal({
  open,
  setOpen,
  title,
  message,
  isPending,
  onConfirm
}: ConfirmationModalProps) {
  const t = useTranslations()

  return (
    <AppModal open={open} setOpen={setOpen} title={title}>
      <Stack>
        <Text>{message}</Text>
        <Group>
          <Button
            onClick={() => setOpen(false)}
            type='button'
            variant='light'
            color='gray'
            className='w-full font-semibold text-primary md:flex-1'
            size='lg'
            radius='xl'
          >
            {t('shared.buttons.cancel')}
          </Button>
          <PrimaryButton
            loading={isPending}
            onClick={onConfirm}
            type='button'
            size='lg'
            radius='xl'
            className='w-full font-semibold text-secondary md:flex-1'
          >
            {t('shared.buttons.confirm')}
          </PrimaryButton>
        </Group>
      </Stack>
    </AppModal>
  )
}

function CallRequestModalSkeleton() {
  return (
    <Stack className='p-4'>
      <Skeleton height={20} width='60%' />
      <Skeleton height={40} width='100%' />
      <Skeleton height={16} width='80%' />
      <Skeleton height={16} width='70%' />
      <Skeleton height={16} width='90%' />
      <Group mt='md'>
        <Skeleton height={50} width='48%' />
        <Skeleton height={50} width='48%' />
      </Group>
    </Stack>
  )
}

export interface CallRequestModalProps {
  id: string
  status: CallRequestStatusType
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

function CallRequestModal({
  id,
  status,
  openModal,
  setOpenModal
}: CallRequestModalProps) {
  const t = useTranslations()
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const { data, isLoading, isError, error } = useGetCallRequestById({ id })
  const { callRequest } = data || {}

  const updateCallRequestStatus = useUpdateCallRequest({
    onSuccess: () => {
      setOpenModal(false)
      appNotifications.success(
        t('successMessages.statusUpdatedSuccessfully', {
          item: t('callRequests.callRequest')
        })
      )
    }
  })

  const handleApprove = () => {
    updateCallRequestStatus.mutate({
      id,
      status: CallRequestStatus.Approved
    })
  }

  const handleReject = () => {
    updateCallRequestStatus.mutate({
      id,
      status: CallRequestStatus.Rejected
    })
  }

  const renderButtonsBasedOnStatus = () => {
    switch (status) {
      case CallRequestStatus.Pending:
        return (
          <>
            <Button
              onClick={() => setShowRejectModal(true)}
              type='button'
              variant='light'
              color='gray'
              radius='xl'
              className='w-full font-semibold text-primary md:flex-1'
              size='lg'
            >
              {t('shared.buttons.reject')}
            </Button>
            <PrimaryButton
              onClick={() => setShowApproveModal(true)}
              type='submit'
              size='lg'
              radius='xl'
              className='w-full font-semibold text-secondary md:flex-1'
            >
              {t('shared.buttons.approve')}
            </PrimaryButton>
          </>
        )

      case CallRequestStatus.Rejected:
        return (
          <PrimaryButton
            onClick={() => setShowApproveModal(true)}
            type='button'
            size='lg'
            radius='xl'
            className='w-full font-semibold text-secondary'
          >
            {t('shared.buttons.approve')}
          </PrimaryButton>
        )

      case CallRequestStatus.Approved:
        return (
          <Button
            onClick={() => setShowRejectModal(true)}
            type='button'
            variant='light'
            color='gray'
            size='lg'
            radius='xl'
            className='w-full font-semibold text-primary'
          >
            {t('shared.buttons.reject')}
          </Button>
        )

      default:
        return null
    }
  }

  if (isError) {
    return <FullScreenError error={error} />
  }

  return (
    <AppModal
      size='lg'
      title={`${t('callRequests.modal.approveTitle')} ${t('shared.by')} ${callRequest?.name}`}
      open={openModal}
      setOpen={setOpenModal}
    >
      <ConfirmationModal
        open={showApproveModal}
        setOpen={setShowApproveModal}
        title={t('callRequests.modal.approveTitle')}
        message={t('callRequests.modal.approveMessage')}
        onConfirm={handleApprove}
        isPending={updateCallRequestStatus.isPending}
      />
      <ConfirmationModal
        open={showRejectModal}
        setOpen={setShowRejectModal}
        title={t('callRequests.modal.rejectTitle')}
        message={t('callRequests.modal.rejectMessage')}
        onConfirm={handleReject}
        isPending={updateCallRequestStatus.isPending}
      />

      <Stack>
        {isLoading ? (
          <CallRequestModalSkeleton />
        ) : (
          <>
            <Text className='font-semibold text-neutral-500'>
              {t('shared.fields.name')}: {callRequest?.name}
            </Text>
            <Text className='font-semibold text-neutral-500'>
              {t('shared.fields.phoneNumber')}:{' '}
              <a href={`tel:${callRequest?.phone}`}> {callRequest?.phone}</a>
            </Text>
            <Text className='font-semibold text-neutral-500'>
              {t('shared.fields.email')}:{' '}
              <a href={`mailto:${callRequest?.email}`}> {callRequest?.email}</a>
            </Text>
            <Text className='font-semibold text-neutral-500'>
              {t('leads.card.contactType')}:{' '}
              {callRequest?.contactMethods
                ? Object.keys(callRequest.contactMethods)
                    .filter((method) => {
                      const key =
                        method as keyof typeof callRequest.contactMethods
                      return callRequest.contactMethods?.[key]
                    })
                    .map(
                      (method) =>
                        method.charAt(0).toUpperCase() + method.slice(1)
                    )
                    .join(', ') || '-'
                : '-'}
            </Text>
          </>
        )}
        <Group>{renderButtonsBasedOnStatus()}</Group>
      </Stack>
    </AppModal>
  )
}

export default CallRequestModal
