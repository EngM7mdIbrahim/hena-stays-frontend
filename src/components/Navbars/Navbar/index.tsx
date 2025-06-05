import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { UserRole } from '@commonTypes'
import { GET_ALL_LINKS, navigationLinks } from '@constants'
import { LinksKeys } from '@enums'
import { useUser } from '@hooks'
import {
  ActionIcon,
  Avatar,
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Menu,
  Stack,
  Text
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslations } from 'next-intl'
import { AiOutlineMessage } from 'react-icons/ai'
import { BiChevronDown, BiUser } from 'react-icons/bi'
import { FaSignOutAlt } from 'react-icons/fa'

import Actions from '@components/Actions'
import AgentCard from '@components/AgentCard'
import LanguageButton from '@components/Buttons/LanguageButton'
import NotificationButton from '@components/NotificationButton'
import { cn } from '@utils'

export interface NavbarDropdownPropertiesProps {
  link: ReturnType<typeof GET_ALL_LINKS>[LinksKeys]
  isSideBar?: boolean
}

function NavbarDropdownProperties({
  link,
  isSideBar
}: NavbarDropdownPropertiesProps) {
  const t = useTranslations()
  return (
    <Menu
      trigger='click-hover'
      openDelay={100}
      closeDelay={100}
      width={200}
      key={link.label}
      shadow='md'
    >
      <Menu.Target>
        {isSideBar ? (
          <Flex
            className={cn(
              `group ml-2 cursor-pointer border-b p-4 font-bold text-default-text last-of-type:border-0`
            )}
          >
            <Flex className='items-center gap-2'>
              <div
                className={cn(
                  'invisible h-10 w-1 bg-primary-gradient opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100'
                )}
              />
              <Text>{link.label}</Text>
              <BiChevronDown />
            </Flex>
          </Flex>
        ) : (
          <Flex
            className={cn(
              `group flex cursor-pointer flex-col items-center font-bold text-default-text`
            )}
          >
            <Flex className='items-center gap-2'>
              <Text>{link.label}</Text>
              <BiChevronDown />
            </Flex>
            <div
              className={cn(
                'invisible h-2 w-7 rounded-full bg-secondary-gradient opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100'
              )}
            />
          </Flex>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component={Link} href={`${link.route}/`}>
          {t('navigation.properties')}
        </Menu.Item>
        <Menu.Item component={Link} href={navigationLinks.projects.allProjects}>
          {t('navigation.projects')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export interface NavbarProps {
  links: LinksKeys[]
}

function Navbar({ links }: NavbarProps) {
  const t = useTranslations()
  const router = useRouter()
  const [isSidebarOpen, setSidebarOpen] = useState(false) // Sidebar visibility state
  const pathName = usePathname()
  const { user, logout } = useUser()
  const ALL_LINKS = GET_ALL_LINKS(t)
  const navBarLinks = links.map((key) => ALL_LINKS[key])
  const isMobileOrTablet = useMediaQuery('(max-width: 768px)')

  const isMediumScreen = useMediaQuery(
    '(min-width: 768px) and (max-width: 1140px)'
  )

  const menuItems = [
    {
      label: t('navigation.myAccount'),
      icon: <BiUser />,
      onClick: () => {
        if (user?.role === UserRole.User) {
          router.push(navigationLinks.userProfile.myAccount.account)
        } else router.push(navigationLinks.userProfile.settings)
      }
    },

    {
      label: t('navigation.logout'),
      icon: <FaSignOutAlt />,
      onClick: logout
    }
  ]
  return (
    <nav className='mb-12 px-4 md:px-12'>
      <div className='flex items-center justify-between gap-4 whitespace-nowrap'>
        {/* Logo */}
        <div className='flex shrink-0 items-center gap-6'>
          {isMediumScreen && !isMobileOrTablet && (
            <Burger
              opened={isSidebarOpen}
              onClick={() => setSidebarOpen((prev) => !prev)}
            />
          )}
          <button
            type='button'
            onClick={() => router.push(navigationLinks.landingPage)}
            className='flex cursor-pointer items-center rounded-b-xl bg-secondary p-6 pt-12'
          >
            <Image
              src={navigationLinks.assets.logo}
              width={100}
              height={100}
              alt='Logo'
            />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        {!isMobileOrTablet && !isMediumScreen && (
          <Flex className='gap-3 text-sm lg:gap-5'>
            {navBarLinks.map((link) => {
              const [route] = Array.isArray(link.route)
                ? link.route
                : [link.route]

              return (
                <React.Fragment key={link.label}>
                  {link.label === t('navigation.properties') ? (
                    <NavbarDropdownProperties link={link} />
                  ) : (
                    <Link
                      href={route}
                      className={cn(
                        `group flex flex-col items-center font-bold text-default-text`,
                        pathName === link.route &&
                          'text-neutral-600 dark:text-default-text',
                        link.route === navigationLinks.auth.signIn &&
                          'bg-primary-gradient bg-clip-text text-transparent'
                      )}
                    >
                      <Text>{link.label}</Text>
                      <div
                        className={cn(
                          'invisible h-2 w-7 rounded-full bg-secondary-gradient opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100',
                          pathName === link.route ? 'visible opacity-100' : ''
                        )}
                      />
                    </Link>
                  )}
                </React.Fragment>
              )
            })}
          </Flex>
        )}

        {/* Desktop User Actions */}
        {!isMobileOrTablet && (
          <Flex className='mb-2 space-x-4'>
            <LanguageButton />
            <Flex className='items-center' gap={8}>
              {!user?._id ? (
                <Button
                  component={Link}
                  href={navigationLinks.auth.signUp}
                  size='md'
                  className='rounded-md px-6 py-2 text-secondary'
                >
                  {t('navigation.startForFree')}
                </Button>
              ) : (
                <>
                  <ActionIcon
                    component={Link}
                    href={navigationLinks.chats}
                    variant='subtle'
                    color='gray'
                  >
                    <AiOutlineMessage />
                  </ActionIcon>
                  <Divider mx={4} orientation='vertical' size='sm' />
                  <NotificationButton />
                  <Actions
                    withinPortal={false}
                    items={menuItems}
                    targetTrigger={
                      <Avatar
                        name={user?.name}
                        src={user?.image}
                        alt={user?.name}
                        className='cursor-pointer'
                        radius='xl'
                        size='md'
                      />
                    }
                  />
                </>
              )}
            </Flex>
          </Flex>
        )}

        {/* Mobile Sidebar Toggle */}
        {isMobileOrTablet && (
          <Burger
            opened={isSidebarOpen}
            onClick={() => setSidebarOpen((prev) => !prev)}
          />
        )}
      </div>

      {/* Sidebar Drawer for Mobile */}
      {(isMobileOrTablet || isMediumScreen) && (
        <Drawer
          opened={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          padding='md'
          size='md'
          withCloseButton={false}
          position={isMediumScreen ? 'left' : 'right'}
        >
          <Flex className='mb-8 justify-between'>
            <div className='flex items-center gap-4'>
              <div className='-mt-4 flex items-center rounded-b-3xl bg-secondary p-6 pt-12'>
                <Image
                  src={navigationLinks.assets.logo}
                  width={100}
                  height={100}
                  alt='Logo'
                />
              </div>
            </div>

            <Stack className='items-end'>
              <Burger
                size='sm'
                opened={isSidebarOpen}
                onClick={() => setSidebarOpen((prev) => !prev)}
              />

              {user?._id ? (
                <Flex className='items-center gap-4'>
                  <NotificationButton />
                  <LanguageButton />
                </Flex>
              ) : (
                <LanguageButton />
              )}
            </Stack>
          </Flex>
          {user?._id && (
            <AgentCard
              onClick={() =>
                router.push(navigationLinks.userProfile.myAccount.account)
              }
              avatar={user?.image || ''}
              className='cursor-pointer'
              name='Welcome Back'
              agentRole={user?.name}
            />
          )}
          <div className='flex flex-col space-y-4'>
            {navBarLinks.map((link) => {
              const [route] = Array.isArray(link.route)
                ? link.route
                : [link.route]

              return (
                <React.Fragment key={link.label}>
                  {link.label === t('navigation.properties') ? (
                    <NavbarDropdownProperties isSideBar link={link} />
                  ) : (
                    <Link
                      onClick={() => setSidebarOpen(false)}
                      href={route}
                      className={cn(
                        `group flex flex-col border-b p-4 font-bold text-default-text last-of-type:border-0`,
                        pathName === link.route && 'text-neutral-600',
                        link.route === navigationLinks.auth.signIn &&
                          'bg-primary-gradient bg-clip-text text-transparent'
                      )}
                    >
                      <Flex className='items-center gap-4'>
                        <div
                          className={cn(
                            'invisible h-10 w-1 bg-primary-gradient opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100',
                            pathName === link.route ? 'visible opacity-100' : ''
                          )}
                        />
                        <Text>{link.label}</Text>
                      </Flex>
                    </Link>
                  )}
                </React.Fragment>
              )
            })}

            <div>
              {!user?._id ? (
                <Stack>
                  {!isMediumScreen && (
                    <>
                      <Button
                        component={Link}
                        href={navigationLinks.auth.signUp}
                        fullWidth
                        size='md'
                        className='rounded-lg font-bold text-secondary'
                      >
                        {t('navigation.startForFree')}
                      </Button>
                      <Button
                        component={Link}
                        href={navigationLinks.auth.signIn}
                        fullWidth
                        variant='light'
                        color='gray'
                        size='md'
                        className='mb-4 rounded-lg font-bold capitalize text-primary'
                      >
                        {t('navigation.login')}
                      </Button>
                    </>
                  )}
                </Stack>
              ) : (
                <Flex
                  onClick={logout}
                  className='cursor-pointer items-center rounded-lg border p-4 text-lg text-error-500 hover:text-error-400'
                >
                  <span className='mr-3'>
                    <FaSignOutAlt />
                  </span>
                  <span className='font-medium'>{t('navigation.logout')}</span>
                </Flex>
              )}
            </div>
          </div>
        </Drawer>
      )}
    </nav>
  )
}

export default Navbar
