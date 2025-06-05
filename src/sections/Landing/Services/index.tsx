import React from 'react'
import { useRouter } from 'next/navigation'
import { SERVICES } from '@constants'
import { BackgroundImage, Box, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import HeaderSection from '@components/HeaderSection'

export interface ServiceCardProps {
  src: string
  description: string
  title: string
  link: string
}

function ServiceCard({ src, description, title, link }: ServiceCardProps) {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const router = useRouter()
  const t = useTranslations()
  return (
    <BackgroundImage
      src={src}
      h={isMobile ? 250 : 500}
      w={isMobile ? '100%' : 350}
      radius={!isMobile ? 0 : 'lg'}
    >
      <Box className='relative h-full'>
        <Box className='absolute bottom-0 left-0 right-0 p-6'>
          <Text className='mb-2 font-semibold text-white md:text-xl'>
            {title}
          </Text>
          <Text className='mb-4 text-sm text-gray-200 md:text-md'>
            {description}
          </Text>
          <PrimaryButton
            onClick={() => router.push(link)}
            size='lg'
            fullWidth
            className='rounded-lg font-bold text-secondary'
          >
            {t('homePage.services.buttonTitle')}
          </PrimaryButton>
        </Box>
      </Box>
    </BackgroundImage>
  )
}

function Services() {
  const t = useTranslations()
  return (
    <Box className='px-4 py-10 md:px-8 lg:px-12'>
      <Box className='md:w-[70%] lg:w-[30%]'>
        <HeaderSection
          title={t('homePage.services.title')}
          badgeTitle={t('homePage.services.badgeTitle')}
        />
      </Box>
      <Box className='mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-between'>
        {SERVICES(t).map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </Box>
    </Box>
  )
}

export default Services
