'use client'

import React, { useState } from 'react'
import { navigationLinks } from '@constants'
import { Button, Stack, Text } from '@mantine/core'
import OwnerPropertiesSection from '@sections/Properties/OwnerPropertiesSection'
import { useTranslations } from 'next-intl'

import Breadcrumb from '@components/Breadcrumb'
import ConfigModal from '@components/Subscription/ConfigModal'

function AdminPropertiesPage() {
  const t = useTranslations()
  const [openDefaultConfigModal, setOpenDefaultConfigModal] = useState(false)
  const breadCrumbList = [
    {
      label: t('shared.breadcrumb.home'),
      link: navigationLinks.landingPage
    },

    {
      label: t('shared.breadcrumb.properties'),
      link: navigationLinks.admin.properties.allProperties
    }
  ]
  return (
    <Stack className='min-h-screen gap-6 px-4 md:px-12'>
      {openDefaultConfigModal && (
        <ConfigModal
          openConfigModal={openDefaultConfigModal}
          setOpenConfigModal={setOpenDefaultConfigModal}
        />
      )}
      <Breadcrumb className='gap-2 md:gap-0' list={breadCrumbList} />
      <Stack>
        <Text
          component='h1'
          className='text-2xl font-bold text-neutral-700 md:text-4xl'
        >
          {t('properties.buttons.adminActions')}
        </Text>
        <Button
          onClick={() => setOpenDefaultConfigModal(true)}
          variant='light'
          color='gray'
          className='w-fit rounded-lg font-semibold text-primary'
          size='lg'
        >
          {t('properties.buttons.defaultConfig')}
        </Button>
      </Stack>

      <OwnerPropertiesSection mine={false} />
    </Stack>
  )
}

export default AdminPropertiesPage
