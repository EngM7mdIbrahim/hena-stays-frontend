'use client'

import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import { AddLayout } from '@layouts'
import { useTranslations } from 'next-intl'

export default function NextAddLayout({ children }: PropsWithChildren) {
  const pathName = usePathname()
  const t = useTranslations()
  return (
    <AddLayout
      containerWidth='65%'
      pageTitle={
        pathName?.includes('add')
          ? t('shared.differentLayout.addLayout', {
              item: t('shared.breadcrumb.employee')
            })
          : t('shared.differentLayout.editLayout', {
              item: t('shared.breadcrumb.employee')
            })
      }
    >
      {children}
    </AddLayout>
  )
}
