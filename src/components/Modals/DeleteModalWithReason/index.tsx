import React, { useMemo } from 'react'
import { Button, Flex, Modal, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import SelectField from '@components/CustomFields/SelectField'
import TextareaField from '@components/CustomFields/TextareaField'

import { AppModalProps } from '../AppModal'

interface DeleteModalWithReasonProps
  extends Pick<AppModalProps, 'open' | 'setOpen'> {
  itemName?: string
  onDelete: (reasonDelete: string) => void | Promise<void>
  loading?: boolean
  defaultReasons?: string[]
  title?: string
  description?: string
}

function DeleteModalWithReason({
  setOpen,
  open,
  onDelete,
  itemName,
  loading,
  title,
  description,
  defaultReasons = []
}: DeleteModalWithReasonProps) {
  const t = useTranslations()
  const deleteForm = useForm({
    initialValues: {
      reasonDelete: '',
      otherReason: ''
    },
    validate: zodResolver(
      z
        .object({
          // From the default reasons
          reasonDelete: z.string().min(
            1,
            t('errorMessages.shared.required', {
              field: t('shared.deleteModal.reason')
            })
          ),
          // Other reason
          otherReason: z.string().optional()
        })
        .refine(
          (data) => {
            if (data.reasonDelete === t('shared.deleteModal.otherReason')) {
              return !!data.otherReason
            }
            return !!data.reasonDelete
          },
          {
            message: t('errorMessages.shared.required', {
              field: t('shared.deleteModal.reason')
            }),
            path: ['reasonDelete']
          }
        )
    )
  })
  const deleteReasonOptions = useMemo(() => {
    return [...defaultReasons, t('shared.deleteModal.otherReason')].map(
      (reason) => ({
        value: reason,
        label: reason
      })
    )
  }, [defaultReasons])
  const handleSubmit = (values: typeof deleteForm.values) => {
    if (values.reasonDelete === t('shared.deleteModal.otherReason')) {
      onDelete(values.otherReason)
    } else {
      onDelete(values.reasonDelete)
    }
  }
  return (
    <Modal
      onClick={(e) => {
        e.stopPropagation()
      }}
      opened={open}
      onClose={() => setOpen(false)}
      withCloseButton={false}
      centered
      size='lg'
      radius='lg'
    >
      <Modal.Header className='px-0 py-4'>
        <Modal.Title className='text-lg font-semibold'>
          {title || t('shared.deleteModal.title')}
        </Modal.Title>
        <Modal.CloseButton
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setOpen(false)
          }}
        />
      </Modal.Header>

      <Text size='sm'>
        {description ||
          t('shared.deleteModal.description', {
            itemName: itemName || t('shared.deleteModal.itemName')
          })}
      </Text>
      <form
        className='space-y-4'
        onSubmit={deleteForm.onSubmit((values) => handleSubmit(values))}
      >
        <SelectField
          data={deleteReasonOptions}
          placeholder={t('shared.deleteModal.selectReason')}
          {...deleteForm.getInputProps('reasonDelete')}
        />
        <TextareaField
          disabled={
            deleteForm.values.reasonDelete !==
            t('shared.deleteModal.otherReason')
          }
          label={t('shared.deleteModal.otherReason')}
          placeholder={t('shared.deleteModal.otherReasonPlaceholder')}
          {...deleteForm.getInputProps('otherReason')}
        />

        <Flex gap={6} mt='md'>
          <Button
            onClick={() => setOpen(false)}
            variant='light'
            className='bg-error50 w-full rounded-lg font-semibold text-error-500 md:w-1/2'
            size='lg'
          >
            {t('shared.deleteModal.back')}
          </Button>

          <Button
            disabled={!deleteForm.isValid()}
            loading={loading}
            type='submit'
            size='lg'
            className='w-full rounded-lg bg-error-600 font-semibold text-default-text md:w-1/2'
          >
            {title
              ? t('shared.deleteModal.reject')
              : t('shared.deleteModal.delete')}
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}

export default DeleteModalWithReason
