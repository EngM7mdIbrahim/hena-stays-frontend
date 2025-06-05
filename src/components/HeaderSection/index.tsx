import React from 'react'
import Link from 'next/link'
import { Badge, Flex, Stack, Text } from '@mantine/core'
import { useLocale, useTranslations } from 'next-intl'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { cn } from '@utils'

export interface HeaderSectionProps {
  badgeTitle?: string
  title?: string
  titleClassName?: string
  badgeClassName?: string
  href?: string
}

function HeaderSection({
  badgeTitle,
  title,
  href,
  badgeClassName,
  titleClassName
}: HeaderSectionProps) {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <Stack>
      {/* badge */}
      {badgeTitle && (
        <Badge
          className={cn(
            'rounded-full bg-brand-50 p-4 text-md font-semibold capitalize text-primary',
            badgeClassName
          )}
        >
          {badgeTitle}
        </Badge>
      )}
      <Flex className='flex-wrap items-center justify-between gap-2'>
        <Text
          className={cn(
            'text-2xl font-bold leading-[1.2] text-secondary dark:text-neutral-700 md:text-[2.5rem]',
            titleClassName
          )}
        >
          {title}
        </Text>
        {href && (
          <Link
            replace
            href={href}
            className='flex cursor-pointer items-center gap-1 text-primary underline hover:no-underline'
          >
            <span className='text-md font-semibold'>
              {t('homePage.exploreMore')}
            </span>
            {locale.startsWith('ar') ? <FaArrowLeft /> : <FaArrowRight />}
          </Link>
        )}
      </Flex>
    </Stack>
  )
}

export default HeaderSection
