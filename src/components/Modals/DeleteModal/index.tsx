import React from 'react'
import { Button, Group, Modal, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { AppModalProps } from '../AppModal'

interface DeleteModalProps extends Pick<AppModalProps, 'open' | 'setOpen'> {
  itemName?: string
  onDelete: () => void
  loading?: boolean
  children?: React.ReactNode
}

function DeleteModal({
  setOpen,
  open,
  onDelete,
  itemName,
  children,
  loading
}: DeleteModalProps) {
  const t = useTranslations()
  return (
    <Modal
      className='z-50'
      opened={open}
      onClose={() => setOpen(false)}
      withCloseButton={false}
      centered
    >
      <Modal.Header className='px-0 py-4'>
        <Modal.Title>{t('shared.deleteModal.title')}</Modal.Title>
        <Modal.CloseButton
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setOpen(false)
          }}
        />
      </Modal.Header>

      <Text size='sm'>
        {t('shared.deleteModal.description', {
          itemName: itemName || t('shared.deleteModal.itemName')
        })}
      </Text>
      {children}
      <Group mt='md'>
        <Button variant='default' onClick={() => setOpen(false)}>
          {t('shared.deleteModal.back')}
        </Button>
        <Button
          loading={loading}
          color='red'
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          {t('shared.deleteModal.delete')}
        </Button>
      </Group>
    </Modal>
  )
}

export default DeleteModal
