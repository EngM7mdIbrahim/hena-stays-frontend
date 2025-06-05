'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { Breadcrumbs } from '@mantine/core'
import { BreadcrumbList } from 'schema-dts'

import { cn } from '@utils'

export interface BreadcrumbProps {
  list: {
    label?: string
    link: string
  }[]
  className?: string
}

function Breadcrumb({ list, className }: BreadcrumbProps) {
  const pathName = usePathname()
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
    <>
      <Script
        id='breadcrumb-script'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadCrumbList) }}
      />
      <Breadcrumbs
        className={className}
        separator='>'
        separatorMargin='md'
        mt='xs'
      >
        {list.map((item) => (
          <Link
            key={item.label}
            className={cn(
              'no-underline duration-200 hover:underline',
              pathName === item.link
                ? 'font-semibold text-neutral-700 dark:brightness-200'
                : 'text-neutral-500 hover:text-neutral-700'
            )}
            href={item.link}
          >
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>
    </>
  )
}

export default Breadcrumb
