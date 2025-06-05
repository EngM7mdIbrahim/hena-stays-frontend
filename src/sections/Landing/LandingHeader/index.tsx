'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Box, Skeleton, Stack, Text } from '@mantine/core'
import LandingHeaderDropdown from '@sections/Landing/LandingHeader/LandingHeaderDropdown'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

const LandingBackgroundImage = dynamic(
  () => import('./LandingBackgroundImage'),
  {
    ssr: false,
    loading: () => <Skeleton height='80dvh' />
  }
)
function LandingHeader() {
  const t = useTranslations()
  return (
    <Box
      className={cn(
        'relative flex flex-col justify-between lg:h-[100dvh] lg:flex-row'
      )}
    >
      {/* Content */}

      <Stack className={cn('w-full gap-4 px-4 md:w-[80%] md:px-8 lg:px-12')}>
        <Text
          component='h1'
          className='text-4xl font-bold capitalize text-secondary dark:text-neutral-700 md:w-[53%] md:text-4xl lg:w-[70%] lg:text-5xl'
        >
          {t('homePage.hero.title')}
        </Text>
        <Text
          component='p'
          className='text-sm font-semibold text-neutral-500 md:w-[50%] lg:text-[14px]'
        >
          {t('homePage.hero.description')}
        </Text>

        <LandingHeaderDropdown className='mt-0 md:mt-10 lg:mt-32' />
      </Stack>

      {/* Images */}
      <LandingBackgroundImage />
    </Box>
  )
}

export default LandingHeader
