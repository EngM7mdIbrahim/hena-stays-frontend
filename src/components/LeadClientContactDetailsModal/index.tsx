'use client'

import React from 'react'
import { LeadsStatusEnum } from '@commonTypes'
import { DEFAULT_CLIENT_LEAD_FORM_DATA } from '@constants'
import { useUpdateLead } from '@hooks'
import { Button, Group, Input, Stack } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { CLIENT_DETAILS_SCHEMA } from '@schemas'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import PhoneNumberField from '@components/CustomFields/PhoneNumberField'
import TextField from '@components/CustomFields/TextField'
import AppModal from '@components/Modals/AppModal'
import { appNotifications } from '@utils'

export interface LeadClientContactDetailsModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setOpenApprovalModal: React.Dispatch<React.SetStateAction<boolean>>
  leadId: string
}

function LeadClientContactDetailsModal({
  open,
  setOpen,
  setOpenApprovalModal,
  leadId
}: LeadClientContactDetailsModalProps) {
  const t = useTranslations()
  const form = useForm({
    initialValues: DEFAULT_CLIENT_LEAD_FORM_DATA,
    validate: zodResolver(CLIENT_DETAILS_SCHEMA(t)),
    mode: 'controlled'
  })

  const updateLead = useUpdateLead({
    onSuccess: () => {
      setOpen(false)
      setOpenApprovalModal(false)
      appNotifications.success(
        t('leads.modal.messages.success.clientDetailsUpdated')
      )
    }
  })

  const handleSubmit = (data: typeof DEFAULT_CLIENT_LEAD_FORM_DATA) => {
    updateLead.mutate({
      id: leadId,
      status: LeadsStatusEnum.Approved,
      name: data.name,
      userContactDetails: {
        email: data.email,
        phone: data.phone,
        whatsapp: data.phone
      }
    })
  }

  return (
    <AppModal
      open={open}
      setOpen={setOpen}
      size='lg'
      title={t('leads.modal.clientContactDetails.title')}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack className='py-4'>
          <TextField
            withAsterisk
            {...form.getInputProps('name')}
            placeholder={t(
              'leads.modal.clientContactDetails.placeholders.name'
            )}
            label={t('leads.modal.clientContactDetails.fields.name')}
            type='text'
            required
            size='md'
          />
          <TextField
            withAsterisk
            {...form.getInputProps('email')}
            placeholder={t(
              'leads.modal.clientContactDetails.placeholders.email'
            )}
            label={t('leads.modal.clientContactDetails.fields.email')}
            type='email'
            required
            size='md'
          />
          <Stack gap={2}>
            <PhoneNumberField
              label={t('leads.modal.clientContactDetails.fields.phone')}
              {...form.getInputProps('phone')}
            />
            {form.errors.phone && (
              <Input.Error>{form.errors.phone}</Input.Error>
            )}
          </Stack>

          <Group>
            <Button
              onClick={() => setOpen(false)}
              variant='light'
              color='gray'
              className='w-full rounded-lg font-semibold text-primary md:flex-1'
              size='lg'
            >
              {t('leads.modal.buttons.cancel')}
            </Button>
            <PrimaryButton
              loading={updateLead.isPending}
              type='submit'
              size='lg'
              className='w-full rounded-lg font-semibold text-secondary md:flex-1'
            >
              {t('leads.modal.buttons.save')}
            </PrimaryButton>
          </Group>
        </Stack>
      </form>
    </AppModal>
  )
}

export default LeadClientContactDetailsModal
