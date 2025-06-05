import { useMemo } from 'react'
import { ActionIcon, Burger } from '@mantine/core'
import { useLocale } from 'next-intl'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { cn } from '@utils'

export interface ToggleNavbarProps {
  mobileOpened: boolean
  toggleMobile: () => void
  desktopOpened: boolean
  toggleDesktop: () => void
  className?: string
}

export function ToggleNavbar({
  mobileOpened,
  toggleMobile,
  desktopOpened,
  toggleDesktop,
  className
}: ToggleNavbarProps) {
  const locale = useLocale()
  const isIconDirectionRight = useMemo(() => {
    const isArabic = locale.startsWith('ar')
    return isArabic ? desktopOpened : !desktopOpened
  }, [locale, desktopOpened])
  return (
    <>
      <Burger
        className={className}
        opened={mobileOpened}
        onClick={toggleMobile}
        hiddenFrom='sm'
        size='sm'
      />
      <ActionIcon
        style={{
          position: 'absolute',
          bottom: -15,
          ...(locale.startsWith('ar')
            ? {
                right: !desktopOpened ? 10 : 5
              }
            : {
                left: !desktopOpened ? 5 : -15
              }),
          zIndex: 100
        }}
        className={cn('rounded-full text-neutral-700 shadow-lg', className)}
        variant='default'
        size={30}
        color='gray'
        visibleFrom='sm'
        onClick={toggleDesktop}
        aria-label='Video posts'
      >
        {isIconDirectionRight ? (
          <FaChevronRight size={15} />
        ) : (
          <FaChevronLeft size={15} />
        )}
      </ActionIcon>
    </>
  )
}
