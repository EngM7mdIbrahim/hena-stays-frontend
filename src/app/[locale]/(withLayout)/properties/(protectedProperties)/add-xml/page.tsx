'use client'

import React, { useMemo, useState } from 'react'
import { AddPropertyXMLResponse } from '@commonTypes'
import { navigationLinks } from '@constants'
import { useAddPropertyXml } from '@hooks'
import {
  Box,
  Button,
  Flex,
  Input,
  ScrollArea,
  Skeleton,
  Stack,
  Text
} from '@mantine/core'
import AgentsXml from '@sections/Xml/AgentsXml'
import GeneralErrors from '@sections/Xml/GeneralErrors'
import Warnings from '@sections/Xml/Warnings'
import { useTranslations } from 'next-intl'

import AppFragmentTabsControl from '@components/AppFragmentTabsControl'
import Breadcrumb from '@components/Breadcrumb'
import FullScreenError from '@components/FullScreenError'
import LottieLink from '@components/Lotties/LottieLink'

function XmlLoading() {
  return (
    <Flex className='justify-between gap-8'>
      <Skeleton height={50} radius='md' className='mb-4 w-full' />
      <Skeleton height={50} radius='md' className='mb-4 w-full' />
      <Skeleton height={50} radius='md' className='mb-4 w-full' />
    </Flex>
  )
}

function XmlPage() {
  const t = useTranslations()
  const breadcrumbData = [
    {
      label: t('shared.breadcrumb.myProperties'),
      link: navigationLinks.properties.myListings
    },
    {
      label: t('shared.breadcrumb.addXml'),
      link: navigationLinks.properties.addXml
    }
  ]
  const [xml, setXml] = useState('')
  const [extractedData, setExtractedData] = useState<AddPropertyXMLResponse>({
    id: '',
    lastUpdatedAt: '',
    agents: [],
    warnings: {},
    generalErrors: []
  })
  const { mutate, isPending, isError, error, isSuccess } = useAddPropertyXml({
    onSuccess: (data) => {
      setExtractedData(data)
    }
  })

  const { generalErrors, warnings, agents } = extractedData || {}

  const propertiesLength = useMemo(() => {
    return agents?.flatMap((item) => item?.properties || []).length || 0
  }, [extractedData])

  const controlsData = [
    {
      label: `${t('xml.errors.title')} (${generalErrors?.length || 0})`,
      value: 'generalErrors'
    },
    {
      label: `${t('xml.warnings.title')} (${Object.keys(warnings || {}).length || 0})`,
      value: 'warnings'
    },
    {
      label: `${t('xml.importedProperties')} (${propertiesLength || 0})`,
      value: 'importedProperties'
    }
  ]
  const [xmlStep, setXmlStep] = useState(controlsData[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({
      url: xml.trim()
    })
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <Stack className='gap-8 px-4 md:px-12'>
      <Breadcrumb className='gap-2 md:gap-0' list={breadcrumbData} />
      <form
        onSubmit={handleSubmit}
        className='flex w-full flex-col items-center'
      >
        <LottieLink />
        <Text
          component='label'
          className='mx-auto mb-4 w-[50%] min-w-[300px] max-w-[400px] text-center font-bold'
        >
          {t('xml.enterTheLink')}
        </Text>

        <Box className='relative mx-auto w-full md:w-[50%]'>
          <Input
            type='url'
            value={xml}
            onChange={({ currentTarget: { value } }) => setXml(value)}
            placeholder='https://xml.platform.com/.../...'
            classNames={{
              input:
                'h-full rounded-full border-[3px] border-gray-500 p-[20px] font-semibold shadow-lg outline-none focus:border-secondary'
            }}
            required
          />
          <Button
            loading={isPending}
            type='submit'
            className='absolute end-2 top-1/2 h-[75%] -translate-y-1/2 transform rounded-full bg-secondary px-6 font-bold text-white'
          >
            {t('xml.buttons.process')}
          </Button>
        </Box>
      </form>
      {isPending && <XmlLoading />}
      {extractedData && isSuccess && (
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
        <AgentsXml data={extractedData} setData={setExtractedData} />
      )}
    </Stack>
  )
}

export default XmlPage
