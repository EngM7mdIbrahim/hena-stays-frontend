'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GET_ALL_LINKS } from '@constants'
import { LinksKeys } from '@enums'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

export interface ProfileMenuProps {
  links: LinksKeys[]
  className?: string
}

export default function ProfileSidebar({ links, className }: ProfileMenuProps) {
  const pathName = usePathname()
  const t = useTranslations()
  const profileLinks = links.map((key) => GET_ALL_LINKS(t)[key])

  return (
    <aside className={cn('h-screen w-64', className)}>
      <div className='mb-8'>
        <h2 className='text-lg font-semibold text-neutral-500'>
          {t('shared.breadcrumb.myAccount')}
        </h2>
      </div>

      {/* Menu items */}
      <nav className='flex flex-col gap-2'>
        {profileLinks.map((item) => {
          const [route] = Array.isArray(item.route) ? item.route : [item.route]
          return (
            <Link
              key={item.label}
              href={route}
              className={cn(
                'group flex items-center gap-3 rounded-md p-2 text-neutral-700 hover:bg-primary-gradient hover:text-white',
                pathName.includes(route) ? 'bg-primary-gradient text-white' : ''
              )}
            >
              <item.icon
                className={cn(
                  'text-xl text-primary group-hover:text-white',
                  pathName.includes(route) ? 'text-white' : ''
                )}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
