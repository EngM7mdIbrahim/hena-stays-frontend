import React from 'react'
import Image from 'next/image'
import { useRouter as useNextRouter } from 'next/navigation'
import { navigationLinks, SEARCH_PARAM_KEYS } from '@constants'
import { PostTypes } from '@enums'
import { isDark } from '@guards'
import { useLinkConstructor, useUser } from '@hooks'
import { usePathname, useRouter } from '@i18n'
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Text,
  useMantineColorScheme
} from '@mantine/core'
import { useLocale } from 'next-intl'

import NotificationButton from '@components/NotificationButton'
import UserCard from '@components/UserCard'

function HeaderDesktop() {
  const locale = useLocale()
  const router = useNextRouter()
  const langRouter = useRouter()
  const pathname = usePathname()
  const { user } = useUser()
  const { constructLink } = useLinkConstructor()

  const { setColorScheme, colorScheme } = useMantineColorScheme()

  const handleChangeLocale = () => {
    langRouter.replace(pathname, { locale: locale === 'en' ? 'ar' : 'en' })
    langRouter.refresh()
  }

  return (
    <Flex className='flex-1 items-center justify-between'>
      {/* Left Section */}
      <Box
        className='cursor-pointer'
        onClick={() =>
          router.push(
            constructLink(navigationLinks.community.profile(user?._id), {
              [SEARCH_PARAM_KEYS.TYPE_KEY]: PostTypes.Media
            })
          )
        }
      >
        <UserCard user={user} />
      </Box>

      {/* Right Section */}
      <Group>
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

        <NotificationButton />

        <Flex
          align='center'
          className='cursor-pointer'
          onClick={handleChangeLocale}
        >
          <ActionIcon variant='transparent'>
            <Image
              src='/svgs/locale.svg'
              width={18}
              height={18}
              alt='language'
            />
          </ActionIcon>
          <Text size='sm' c='blue.8'>
            {locale === 'en' ? 'EN' : 'AR'}
          </Text>
        </Flex>
      </Group>
    </Flex>
  )
}

export default HeaderDesktop
