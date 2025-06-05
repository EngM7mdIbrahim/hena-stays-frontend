import React from 'react'
import Image from 'next/image'
import { navigationLinks } from '@constants'
import { Box, Flex, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import HeaderSection from '@components/HeaderSection'

function About() {
  const t = useTranslations()
  return (
    <Flex className='hidden flex-wrap items-center justify-evenly gap-4 p-2 md:flex'>
      <Box className='relative'>
        <Image
          src={navigationLinks.assets.landing.about}
          alt='about'
          width={450}
          height={450}
        />
        <Stack className='absolute -bottom-10 -start-10 hidden h-[200px] w-[180px] bg-default-background p-8 shadow-md lg:flex'>
          <Image
            className='dark:brightness-200'
            src={navigationLinks.assets.landing.aboutIcons['1']}
            alt='trophy'
            width={70}
            height={70}
          />
          <Text className='w-[85%] font-semibold text-neutral-800'>
            {t('homePage.about.expertAdvice.title')}
          </Text>
        </Stack>
      </Box>
      <Stack className='w-[50%] gap-20'>
        <Stack className='lg:w-[75%]'>
          <HeaderSection
            title={t('homePage.about.title')}
            badgeTitle={t('homePage.about.badgeTitle')}
          />
          <Text className='font-semibold text-neutral-500'>
            {t('homePage.about.description')}
          </Text>
        </Stack>
        <Flex className='w-full items-baseline gap-20'>
          <Stack className='gap-2 lg:w-[40%]'>
            <Image
              className='dark:brightness-200'
              src={navigationLinks.assets.landing.aboutIcons['2']}
              alt='home'
              width={70}
              height={70}
            />
            <Box>
              <Text className='font-semibold text-neutral-800'>
                {t('homePage.about.efficiency.title')}
              </Text>
              <Text className='text-sm text-neutral-500'>
                {t('homePage.about.efficiency.description')}
              </Text>
            </Box>
          </Stack>
          <Stack className='gap-2 lg:w-[40%]'>
            <Image
              className='dark:brightness-200'
              src={navigationLinks.assets.landing.aboutIcons['3']}
              alt='home'
              width={70}
              height={70}
            />
            <Box>
              <Text className='font-semibold text-neutral-800'>
                {t('homePage.about.getNoticed.title')}
              </Text>
              <Text className='text-sm text-neutral-500'>
                {t('homePage.about.getNoticed.description')}
              </Text>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default About
