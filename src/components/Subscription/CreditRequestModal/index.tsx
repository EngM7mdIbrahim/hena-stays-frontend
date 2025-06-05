import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import {
  CallRequestStatus,
  CreditRequestStatus,
  CreditRequestStatusType,
  MediaTypeEnum,
  User
} from '@commonTypes'
import { isPopulated } from '@guards'
import { useGetCreditsRequest, useUpdateCreditRequestStatus } from '@hooks'
import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { MdDownload } from 'react-icons/md'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'
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

export interface CreditRequestModalProps {
  id: string
  status: CreditRequestStatusType
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

function CreditRequestModal({
  id,
  status,
  openModal,
  setOpenModal
}: CreditRequestModalProps) {
  const t = useTranslations()
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showApproveModal, setShowApproveModal] = useState(false)

  const { data, isLoading, isError, error } = useGetCreditsRequest({
    id,
    showFields: {
      user: true
    }
  })
  const { creditsRequest } = data || {}

  const updateStatus = useUpdateCreditRequestStatus({
    onSuccess: () => {
      setOpenModal(false)
      appNotifications.success(
        t('successMessages.statusUpdatedSuccessfully', {
          item: t('creditsRequests.creditRequest')
        })
      )
    }
  })

  const handleApprove = () => {
    updateStatus.mutate({
      id,
      status: CreditRequestStatus.Accepted
    })
  }

  const handleReject = () => {
    updateStatus.mutate({
      id,
      status: CreditRequestStatus.Rejected
    })
  }

  const forceDownload = (url: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = blobUrl
        a.download = 'Receipt'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(blobUrl)
      })
      .catch((downloadError) => appNotifications.error(downloadError))
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

  let content = null

  if (isError && error) content = <FullScreenError error={error} />
  if (isLoading) content = <LoaderScreen />

  if (isPopulated<User>(creditsRequest?.user)) {
    return (
      <AppModal
        size='lg'
        title={t('creditsRequests.creditRequestFrom', {
          user: creditsRequest?.user?.name
        })}
        open={openModal}
        setOpen={setOpenModal}
      >
        {content}
        {!isError && !isLoading && (
          <>
            <ConfirmationModal
              open={showApproveModal}
              setOpen={setShowApproveModal}
              title={t('creditsRequests.approveModal.title')}
              message={t('creditsRequests.approveModal.message')}
              onConfirm={handleApprove}
              isPending={updateStatus.isPending}
            />
            <ConfirmationModal
              open={showRejectModal}
              setOpen={setShowRejectModal}
              title={t('creditsRequests.rejectModal.title')}
              message={t('creditsRequests.rejectModal.message')}
              onConfirm={handleReject}
              isPending={updateStatus.isPending}
            />

            <Stack>
              <Text className='mb-4 font-semibold'>
                {t('creditsRequests.columns.status')}: {status}
              </Text>
              <Box className='relative mx-auto h-[400px] w-[400px] border'>
                {creditsRequest?.media?.type === MediaTypeEnum.Image ? (
                  // Render image preview
                  <Image
                    src={creditsRequest?.media?.url}
                    width={300}
                    height={300}
                    alt='request image'
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <embed
                    src={creditsRequest?.media?.url}
                    type='application/pdf'
                    className='h-full w-full object-cover'
                  />
                )}

                {creditsRequest?.media?.type === MediaTypeEnum.Image && (
                  <button
                    type='button'
                    title='Download'
                    onClick={() => forceDownload(creditsRequest?.media?.url)}
                    className='absolute right-4 top-4 rounded-md bg-primary p-2 text-white hover:opacity-90'
                  >
                    <MdDownload />
                  </button>
                )}
              </Box>

              <Group>{renderButtonsBasedOnStatus()}</Group>
            </Stack>
          </>
        )}
      </AppModal>
    )
  }
}

export default CreditRequestModal
