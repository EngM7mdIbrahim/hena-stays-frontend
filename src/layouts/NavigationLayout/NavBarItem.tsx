'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { navigationLinks } from '@constants'
import { Box, Flex } from '@mantine/core'

import { SidebarLink } from '@interfaces'
import { cn } from '@utils'

export interface NavBarItemProps extends SidebarLink {
  pathName: string
  special?: boolean
}

export default function NavBarItem({
  pathName,
  special,
  ...item
}: NavBarItemProps) {
  // Special case for landing page
  const [route] = Array.isArray(item.route) ? item.route : [item.route]
  const selected = useMemo(() => {
    if (item.route === navigationLinks.landingPage) {
      return pathName === navigationLinks.landingPage
    }
    if (Array.isArray(item.route)) {
      return item.route.some((link) => pathName.includes(link))
    }
    return pathName.includes(item.route)
  }, [pathName, item.route])

  return (
    <>
      {special && <Box className='my-4 border-t border-neutral-800' />}
      <Flex
        component={Link}
        href={route}
        key={item.label}
        className={cn(
          `my-2 cursor-pointer items-center gap-4 rounded-full p-4 hover:bg-white hover:text-secondary`,
          selected ? 'bg-white text-secondary' : 'bg-transparent text-white'
        )}
      >
        <span className='mr-3 text-lg'>
          <item.icon size={20} />
        </span>
        <span className={cn('text-sm font-bold', selected && 'text-secondary')}>
          {item.label}
        </span>
      </Flex>
    </>
  )
}
