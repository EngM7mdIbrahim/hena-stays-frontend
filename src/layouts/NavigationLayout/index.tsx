import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import { GET_ALL_LINKS } from '@constants'
import { LinksKeys } from '@enums'
import { AppShell, Box, Burger, Group, ScrollArea } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useLocale, useTranslations } from 'next-intl'

import Header from './Header'
import { Logo } from './Logo'
import LogoutButton from './LogoutButton'
import NavBarItem from './NavBarItem'
import { ToggleNavbar } from './ToggleNavbar'

export interface NavigationLayoutProps extends PropsWithChildren {
  links: LinksKeys[]
  specialLinks?: LinksKeys[]
}

export default function NavigationLayout({
  children,
  links,
  specialLinks
}: NavigationLayoutProps) {
  const t = useTranslations()
  const ALL_LINKS = GET_ALL_LINKS(t)
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  const matches = useMediaQuery('(min-width: 56.25em)')
  const pathName = usePathname()
  const sidebarLinks = links.map((key) => ALL_LINKS[key])
  const specialSidebarLinks = specialLinks?.map((key) => ALL_LINKS[key])
  const locale = useLocale()

  return (
    <AppShell
      className='flex-1'
      header={{ height: 120 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
      }}
      padding='md'
      layout='alt'
      dir={locale.startsWith('ar') ? 'rtl' : 'ltr'}
    >
      <AppShell.Header>
        <Group
          style={{ position: matches ? 'relative' : 'static' }}
          h='100%'
          px='md'
        >
          <ToggleNavbar
            mobileOpened={mobileOpened}
            toggleMobile={toggleMobile}
            desktopOpened={desktopOpened}
            toggleDesktop={toggleDesktop}
          />
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        px='sm'
        style={{ zIndex: matches ? 10 : 100 }}
        className='bg-secondary'
      >
        <AppShell.Section grow component={ScrollArea} offsetScrollbars>
          <>
            <Box
              className='grid grid-cols-3 items-center border-b border-white md:flex md:justify-center'
              h={120}
              w='100%'
            >
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom='sm'
                size='sm'
                color='white'
              />
              <Logo />
            </Box>

            {/* Menu Items */}
            <nav className='py-2'>
              {sidebarLinks.map((item) => (
                <NavBarItem
                  pathName={pathName || ''}
                  key={item.label}
                  {...item}
                />
              ))}
              {specialSidebarLinks?.map((item) => (
                <NavBarItem
                  pathName={pathName || ''}
                  key={item.label}
                  special
                  {...item}
                />
              ))}
            </nav>
          </>

          {/* Bottom Section (Logout) */}

          <Box className='my-4 border-t border-neutral-500' />
          <LogoutButton />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
