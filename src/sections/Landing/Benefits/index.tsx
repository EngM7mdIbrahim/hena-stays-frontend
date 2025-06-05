import React from 'react'
import Image from 'next/image'
import { BENEFITS } from '@constants'
import { Box, Flex, Stack, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useLocale, useTranslations } from 'next-intl'

import HeaderSection from '@components/HeaderSection'
import { cn } from '@utils'

export interface BenefitCardProps {
  icon: JSX.Element
  title: string
  description: string
  special?: boolean
  className?: string
}

function BenefitCard({
  icon,
  title,
  description,
  special,
  className
}: BenefitCardProps) {
  return (
    <Stack
      className={cn(
        'items-center justify-center p-4 py-10 font-lexend',
        special ? 'rounded-md bg-default-background' : 'bg-transparent',
        className
      )}
    >
      <Flex
        className={cn(
          'flex items-center justify-center gap-2 rounded-full p-4',
          special ? 'bg-primary-gradient' : 'bg-default-background'
        )}
      >
        {icon}
      </Flex>

      {/* title */}
      <Text
        component='h3'
        className='text-xl font-bold capitalize text-secondary dark:text-neutral-700'
      >
        {title}
      </Text>
      {/* description */}
      <Text component='p' className='text-center font-rubik text-neutral-600'>
        {description}
      </Text>
    </Stack>
  )
}

function Benefits() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isSmallMobile = useMediaQuery('(max-width: 400px)')
  const t = useTranslations()
  const locale = useLocale()
  const isArabic = locale.startsWith('ar')
  return (
    <Box className='px-4 md:px-8 lg:px-12'>
      <HeaderSection
        title={t('homePage.benefits.title')}
        badgeTitle={t('homePage.benefits.badgeTitle')}
      />
      <Box className='relative mt-20 bg-brand-50 p-10 py-20'>
        <Box className={isSmallMobile ? 'hidden' : ''}>
          {isMobile ? (
            <Box>
              <Image
                src='/svgs/landing/benefits/arrow1M.svg'
                width={70}
                height={70}
                alt='arrow'
                className='absolute right-[9%] top-[16%]'
              />
              <Image
                src='/svgs/landing/benefits/arrow2M.svg'
                width={70}
                height={70}
                alt='arrow'
                className='absolute bottom-[26%] left-[9%]'
              />
            </Box>
          ) : (
            <Box>
              <Image
                src='/svgs/landing/benefits/arrow1.svg'
                width={150}
                height={150}
                alt='arrow'
                className={cn(
                  'absolute left-[24%] top-[21%]',
                  isArabic ? 'top-[37%] rotate-180' : ''
                )}
              />
              <Image
                src='/svgs/landing/benefits/arrow2.svg'
                width={150}
                height={150}
                alt='arrow'
                className={cn(
                  'absolute left-[60%] top-[32%]',
                  isArabic ? 'rotate-180' : ''
                )}
              />
            </Box>
          )}
        </Box>
        <Box className='grid grid-cols-1 gap-2 md:grid-cols-3'>
          {BENEFITS(t).map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Benefits
