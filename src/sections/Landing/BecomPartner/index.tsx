import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { navigationLinks } from '@constants'
import { Box, Flex, Stack, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import PrimaryButton from '@components/Buttons/PrimaryButton'

function BecomePartner() {
  const router = useRouter()
  const t = useTranslations()
  return (
    <Box className='px-4 py-10 md:px-8 lg:px-12'>
      <Flex className='flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-[#FFFBF5] to-[#E7EFFF] to-[62%] px-4 py-10 dark:from-[#1A1A1A] dark:to-[#2D3748] md:flex-row md:px-8 lg:px-12'>
        <Flex className='items-center gap-4'>
          <Flex className='items-center justify-center rounded-xl bg-default-background p-4'>
            <Image
              src={navigationLinks.assets.landing.users}
              alt='users'
              width={50}
              height={50}
            />
          </Flex>
          <Stack className='gap-1'>
            <Text className='text-2xl font-semibold capitalize text-secondary dark:text-neutral-700'>
              {t('homePage.becomePartner.title')}
            </Text>
            <Text className='text-neutral-500 md:w-[65%]'>
              {t('homePage.becomePartner.description')}
            </Text>
          </Stack>
        </Flex>
        <PrimaryButton
          onClick={() => {
            router.push(navigationLinks.auth.signUp)
          }}
          size='lg'
          className='w-full rounded-lg font-bold text-secondary md:w-[200px]'
        >
          {t('homePage.becomePartner.buttonTitle')}
        </PrimaryButton>
      </Flex>
    </Box>
  )
}

export default BecomePartner
