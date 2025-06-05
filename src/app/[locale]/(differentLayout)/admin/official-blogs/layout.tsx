'use client'

import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import { AddLayout } from '@layouts'
import { useTranslations } from 'next-intl'

export default function NextAddOfficialBlogLayout({
  children
}: PropsWithChildren) {
  const pathName = usePathname()
  const t = useTranslations()
  return (
    <AddLayout
      pageTitle={
        pathName?.includes('add')
          ? t('shared.differentLayout.addLayout', {
              item: t('officialBlogs.officialBlog')
            })
          : t('shared.differentLayout.editLayout', {
              item: t('officialBlogs.officialBlog')
            })
      }
      containerWidth='80%'
    >
      {children}
    </AddLayout>
  )
}
