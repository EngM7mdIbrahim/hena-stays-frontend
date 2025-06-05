'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PropertyXMLStatus } from '@commonTypes'
import { navigationLinks } from '@constants'
import { useAdminApproval, useGetPropertyXml } from '@hooks'
import {
  Anchor,
  Button,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title
} from '@mantine/core'
import AgentsXml from '@sections/Xml/AgentsXml'
import GeneralErrors from '@sections/Xml/GeneralErrors'
import Warnings from '@sections/Xml/Warnings'
import { useTranslations } from 'next-intl'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import Breadcrumb from '@components/Breadcrumb'
import PrimaryButton from '@components/Buttons/PrimaryButton'
import FullScreenError from '@components/FullScreenError'
import LoaderScreen from '@components/LoaderScreen'
import AppModal from '@components/Modals/AppModal'
import DeleteModalWithReason from '@components/Modals/DeleteModalWithReason'
import { appNotifications, userRoleMap } from '@utils'

export interface ViewXmlRequestProps {
  params: { id: string }
}

function ViewXmlRequest({ params: { id } }: ViewXmlRequestProps) {
  const t = useTranslations()
  const breadcrumbData = [
    { label: t('shared.breadcrumb.home'), link: navigationLinks.landingPage },
    {
      label: t('shared.breadcrumb.properties'),
      link: navigationLinks.admin.properties.allProperties
    },
    {
      label: t('shared.breadcrumb.xmlRequests'),
      link: navigationLinks.admin.properties.xmlRequests
    },
    {
      label: t('xml.xmlRequests.viewRequest'),
      link: navigationLinks.admin.properties.viewXmlRequest(id)
    }
  ]
  const router = useRouter()
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showApproveModal, setShowApproveModal] = useState(false)

  const { data, isLoading, isError, error, isSuccess } = useGetPropertyXml({
    id
  })

  const { generalErrors, warnings, agents } = data || {}

  const propertiesLength = useMemo(() => {
    return agents?.flatMap((item) => item?.properties || []).length || 0
  }, [data])

  const controlsData = [
    {
      label: `${t('xml.errors.title')}(${generalErrors?.length || 0})`,
      value: 'generalErrors'
    },
    {
      label: `${t('xml.warnings.title')}(${Object.keys(warnings || {}).length || 0})`,
      value: 'warnings'
    },
    {
      label: `${t('xml.importedProperties')}(${propertiesLength || 0})`,
      value: 'importedProperties'
    }
  ]
  const [xmlStep, setXmlStep] = useState(controlsData[0])

  const { mutate, isPending } = useAdminApproval({
    onSuccess: () => {
      setShowRejectModal(false)
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('buyPropertyRequests.buyPropertyRequestForm.request')
        })
      )
      router.push(navigationLinks.admin.properties.xmlRequests)
    }
  })

  const handleReject = (reason: string) => {
    mutate({ id, status: PropertyXMLStatus.Rejected, message: reason })
  }

  const handleApprove = () => {
    mutate({ id, status: PropertyXMLStatus.Approved })
  }

  if (isLoading) {
    return <LoaderScreen />
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack className='gap-8 px-4 md:px-12'>
      <DeleteModalWithReason
        open={showRejectModal}
        loading={isPending}
        setOpen={setShowRejectModal}
        title={t('xml.xmlRequests.rejectModal.title')}
        description={t('xml.xmlRequests.rejectModal.message')}
        onDelete={(reasonDelete) => handleReject(reasonDelete)}
        defaultReasons={[
          t('xml.xmlRequests.rejectModal.defaultReasons.duplicateProperty'),
          t('xml.xmlRequests.rejectModal.defaultReasons.incompleteInfo'),
          t('xml.xmlRequests.rejectModal.defaultReasons.violatesGuidelines'),
          t('xml.xmlRequests.rejectModal.defaultReasons.ownerRequest'),
          t('xml.xmlRequests.rejectModal.defaultReasons.technicalIssues'),
          t('xml.xmlRequests.rejectModal.defaultReasons.notAvailable')
        ]}
      />
      <AppModal
        open={showApproveModal}
        setOpen={setShowApproveModal}
        title={t('xml.xmlRequests.approveModal.title')}
      >
        <Stack>
          <Text>{t('xml.xmlRequests.approveModal.message')}</Text>
          <Group>
            <Button
              onClick={() => setShowApproveModal(false)}
              type='button'
              variant='light'
              color='gray'
              className='w-full rounded-lg font-semibold text-primary md:flex-1'
              size='lg'
            >
              {t('xml.xmlRequests.approveModal.cancel')}
            </Button>
            <PrimaryButton
              loading={isPending}
              onClick={handleApprove}
              type='button'
              size='lg'
              className='w-full rounded-lg font-semibold text-secondary md:flex-1'
            >
              {t('xml.xmlRequests.approveModal.confirm')}
            </PrimaryButton>
          </Group>
        </Stack>
      </AppModal>

      <Breadcrumb className='gap-2 md:gap-0' list={breadcrumbData} />
      <Paper withBorder p='md' mt='lg' shadow='sm' radius='lg'>
        <Title order={2} mb='sm'>
          {t('xml.xmlRequests.card.creatorInformation')}
        </Title>

        <Text>
          <Text span fw={500}>
            {t('shared.fields.username')}
          </Text>{' '}
          {data?.creator?.name || 'N/A'}
        </Text>
        <Text>
          <Text span fw={500}>
            {t('shared.fields.email')}
          </Text>
          :{data?.creator?.email || 'N/A'}
        </Text>
        <Text>
          <Text span fw={500}>
            {t('shared.fields.phoneNumber')}
          </Text>
          :{data?.creator?.phone || 'N/A'}
        </Text>
        <Text>
          <Text span fw={500}>
            {t('xml.xmlRequests.card.type')}
          </Text>
          :{userRoleMap(t, data?.creator?.role!) || 'N/A'}
        </Text>
        <Text>
          <Text span fw={500}>
            {t('xml.xmlRequests.mainCard.url')}:{' '}
          </Text>
          <Anchor href={data?.url} target='_blank' underline='hover'>
            {t('xml.xmlRequests.mainCard.linkToXml')}
          </Anchor>
        </Text>
        {data?.rejectionReason && data?.rejectionReason?.length > 0 && (
          <Text>
            <Text span fw={500}>
              {t('xml.xmlRequests.rejectModal.rejectionReason')}:{' '}
            </Text>
            {data?.rejectionReason}
          </Text>
        )}
      </Paper>
      {data && isSuccess && (
        <ScrollArea offsetScrollbars>
          <AppFragmentTabsControl
            notActiveBg='bg-brand-200/50'
            textColor='text-neutral-600'
            data={controlsData}
            value={xmlStep?.value}
            onChange={(value) => {
              setXmlStep(controlsData.find((item) => item.value === value)!)
            }}
          />
        </ScrollArea>
      )}
      {xmlStep?.value === 'generalErrors' && isSuccess && (
        <GeneralErrors generalErrors={generalErrors} />
      )}
      {xmlStep?.value === 'warnings' && isSuccess && (
        <Warnings warnings={warnings} />
      )}
      {xmlStep?.value === 'importedProperties' && isSuccess && (
        <AgentsXml data={data} />
      )}
      <Group>
        <Button
          onClick={() => setShowRejectModal(true)}
          type='button'
          variant='filled'
          color='red'
          className='w-full font-semibold md:flex-1'
          size='lg'
          radius='xl'
        >
          {t('shared.buttons.reject')}
        </Button>
        <PrimaryButton
          onClick={() => setShowApproveModal(true)}
          radius='xl'
          size='lg'
          className='w-full font-semibold text-secondary hover:brightness-95 md:flex-1'
        >
          {t('shared.buttons.approve')}
        </PrimaryButton>
      </Group>
    </Stack>
  )
}

export default ViewXmlRequest
