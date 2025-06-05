import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { PostTypes } from '@enums'
import { isDark } from '@guards'
import { useLinkConstructor, useUser } from '@hooks'
import { ActionIcon, Box, Text, useMantineColorScheme } from '@mantine/core'

import NotificationButton from '@components/NotificationButton'
import UserCard from '@components/UserCard'

function HeaderMobile() {
  const { user } = useUser()
  const router = useRouter()
  const { constructLink } = useLinkConstructor()
  const { setColorScheme, colorScheme } = useMantineColorScheme()

  return (
    <Box className='flex flex-1 items-center'>
      {/* Left Section */}
      <Box
        onClick={() =>
          router.push(
            constructLink(navigationLinks.community.profile(user?._id), {
              [SEARCH_PARAM_KEYS.TYPE_KEY]: PostTypes.Media
            })
          )
        }
        className='flex-2 flex items-center'
      >
        <UserCard user={user} />
      </Box>

      {/* Right Section */}
      <Box className='flex flex-1 items-center justify-end'>
        <NotificationButton />

        {isDark(colorScheme) ? (
          <ActionIcon
            onClick={() => setColorScheme('light')}
            variant='transparent'
          >
            <Image
              src={navigationLinks.assets.sun}
              width={18}
              height={18}
              alt='light-mode'
            />
          </ActionIcon>
        ) : (
          <ActionIcon
            onClick={() => setColorScheme('dark')}
            variant='transparent'
          >
            <Image
              src={navigationLinks.assets.moon}
              width={18}
              height={18}
              alt='dark-mode'
            />
          </ActionIcon>
        )}

        <ActionIcon variant='transparent'>
          <Image src='/svgs/locale.svg' width={18} height={18} alt='language' />
        </ActionIcon>
        <Text size='sm' c='blue.8'>
          EN
        </Text>
      </Box>
    </Box>
  )
}

export default HeaderMobile
