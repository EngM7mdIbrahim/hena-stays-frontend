'use client'

import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import { AddLayout } from '@layouts'
import { useTranslations } from 'next-intl'

export default function NextAddLayout({ children }: PropsWithChildren) {
  const t = useTranslations()
  const pathName = usePathname()
  return (
    <AddLayout
      containerWidth='90%'
      pageTitle={
        pathName?.includes('add')
          ? t('shared.differentLayout.addLayout', {
              item: t('properties.property')
            })
          : t('shared.differentLayout.editLayout', {
              item: t('properties.property')
            })
      }
    >
      {children}
    </AddLayout>
  )
}
