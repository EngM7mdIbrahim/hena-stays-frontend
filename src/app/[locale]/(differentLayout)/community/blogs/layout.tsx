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
      pageTitle={
        pathName?.includes('add')
          ? t('shared.differentLayout.addLayout', {
              item: t('community.blog')
            })
          : t('shared.differentLayout.editLayout', {
              item: t('community.blog')
            })
      }
    >
      {children}
    </AddLayout>
  )
}
