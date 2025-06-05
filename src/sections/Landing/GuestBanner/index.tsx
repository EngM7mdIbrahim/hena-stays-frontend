import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { navigationLinks } from '@constants'
import { Modules } from '@enums'
import { useGetUserPermissions, useProtectAction } from '@hooks'
import { BackgroundImage, Box, Flex, Stack, Text } from '@mantine/core'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import HeaderSection from '@components/HeaderSection'
import { cn } from '@utils'

export interface GuestBannerProps {
  title: string
  description: string
  buttonTitle: string
  className?: string
}

function GuestBanner({
  title,
  description,
  buttonTitle,
  className
}: GuestBannerProps) {
  const router = useRouter()
  const { permissions } = useGetUserPermissions(Modules.SELL_PROPERTY_REQUESTS)
  const protectAction = useProtectAction()

  const handleClick = () => {
    if (permissions.canViewAllSellPropertyRequests) {
      router.push(navigationLinks.sellPropertyRequests.allSellPropertyRequests)
    } else {
      protectAction({
        redirectUrl:
          navigationLinks.sellPropertyRequests.allSellPropertyRequests
      })
    }
  }

  return (
    <Box className={cn('px-0 py-10 md:px-8 lg:px-12', className)}>
      <Box className='hidden md:block'>
        <Flex className='justify-between gap-4 overflow-hidden rounded-3xl bg-gradient-to-r from-[rgba(182,206,255,0.5)] via-[rgba(0,83,254,0.3)] to-[rgba(0,83,254,0.3)] px-4 py-10 dark:from-[rgba(26,26,26,0.5)] dark:via-[rgba(45,55,72,0.3)] dark:to-[rgba(45,55,72,0.3)] md:px-8 lg:px-12'>
          <Stack className='gap-3 md:w-[60%] lg:w-[50%]'>
            <HeaderSection title={title} />
            <Text className='font-semibold text-neutral-600'>
              {description}
            </Text>
            <PrimaryButton
              onClick={handleClick}
              size='lg'
              className='mt-3 w-full rounded-lg font-bold text-secondary md:w-fit'
            >
              {buttonTitle}
            </PrimaryButton>
          </Stack>
          <Box className='relative w-full'>
            <Image
              src={navigationLinks.assets.landing.sell.sell}
              alt='sell'
              width={400}
              height={400}
              className='absolute -bottom-[20%] end-4'
            />
          </Box>
        </Flex>
      </Box>
      <Box className='block md:hidden'>
        <BackgroundImage
          src={navigationLinks.assets.landing.sell.sellMobile}
          h={400}
          className='flex w-full items-center justify-center px-8 text-center'
        >
          <Box className='rounded-3xl bg-default-background/50 p-8 backdrop-blur-md'>
            <Stack className='items-center justify-center gap-3'>
              <HeaderSection title={title} />
              <Text className='font-semibold text-neutral-600'>
                {description}
              </Text>
              <PrimaryButton
                onClick={handleClick}
                size='lg'
                className='w-full rounded-lg font-bold text-secondary md:w-[150px]'
              >
                {buttonTitle}
              </PrimaryButton>
            </Stack>
          </Box>
        </BackgroundImage>
      </Box>
    </Box>
  )
}

export default GuestBanner
