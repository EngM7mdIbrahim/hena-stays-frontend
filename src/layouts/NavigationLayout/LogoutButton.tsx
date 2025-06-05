import React from 'react'
import { useUser } from '@hooks'
import { Flex } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { FaSignOutAlt } from 'react-icons/fa'

function LogoutButton() {
  const { logout } = useUser()
  const t = useTranslations()
  return (
    <Flex
      component='button'
      onClick={logout}
      className='cursor-pointer items-center gap-3 rounded-md p-2 text-red-500 hover:text-red-400'
    >
      <span className='text-lg'>
        <FaSignOutAlt />
      </span>
      <span className='text-sm font-medium'>{t('navigation.logout')}</span>
    </Flex>
  )
}

export default LogoutButton
