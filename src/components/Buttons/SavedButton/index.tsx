import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { navigationLinks } from '@constants'
import { Button } from '@mantine/core'
import { useTranslations } from 'next-intl'

function SavedButton() {
  const t = useTranslations()
  return (
    <Button
      variant='transparent'
      color='gray'
      className='relative font-semibold text-neutral-600'
      size='lg'
      component={Link}
      href={navigationLinks.properties.savedProperties}
    >
      <div className='relative z-10 flex items-center gap-2'>
        {' '}
        <Image
          width={20}
          height={20}
          alt='Save Property'
          src={navigationLinks.assets.bookmarkGradient}
        />
        <span>{t('properties.buttons.saved')}</span>
      </div>
      {/* Gradient border */}
      <div
        aria-hidden='true'
        className='absolute inset-0 rounded-[12px] bg-primary-gradient p-[0.9px]'
      >
        <div className='h-full w-full rounded-[12px] bg-default-background' />
      </div>
    </Button>
  )
}

export default SavedButton
