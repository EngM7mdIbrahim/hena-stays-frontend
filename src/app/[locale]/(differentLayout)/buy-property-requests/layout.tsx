'use client'

import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import { AddLayout } from '@layouts'
import { useTranslations } from 'next-intl'

export default function NextAddLayout({ children }: PropsWithChildren) {
  const pathName = usePathname()
  const t = useTranslations()

  let title = ''
  if (pathName?.includes('add')) {
    title = t('shared.differentLayout.addLayout', {
      item: t('buyPropertyRequests.buyPropertyRequest')
    })
  } else if (pathName?.includes('edit')) {
    title = t('shared.differentLayout.editLayout', {
      item: t('buyPropertyRequests.buyPropertyRequest')
    })
  } else {
    title = t('buyPropertyRequests.makeACallForm.title')
  }

  return (
    <AddLayout
      containerClassName='min-h-full'
      containerWidth='100%'
      pageTitle={title}
    >
      {children}
    </AddLayout>
  )
}
