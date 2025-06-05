'use client'

import React from 'react'
import Script from 'next/script'
import { Stack, Text } from '@mantine/core'
import { BreadcrumbList } from 'schema-dts'

import Breadcrumb, { BreadcrumbProps } from '@components/Breadcrumb'

export interface BreadcrumbWithHeaderProps extends BreadcrumbProps {
  title?: string
}

function BreadcrumbWithHeader({ title, list }: BreadcrumbWithHeaderProps) {
  const breadCrumbList: BreadcrumbList & { '@context': string } = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': list?.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': item.link,
        'name': item.label
      }
    }))
  }
  return (
    <Stack className='gap-2'>
      <Script
        id='breadcrumb-with-header-script'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadCrumbList) }}
      />
      <Text className='text-3xl font-bold capitalize text-neutral-700'>
        {title}
      </Text>
      <Breadcrumb list={list} />
    </Stack>
  )
}

export default BreadcrumbWithHeader
