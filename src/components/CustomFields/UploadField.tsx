'use client'

import React, { useEffect, useRef } from 'react'
import { FileInput, FileInputProps, Flex } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

function UploadField({
  onChange,
  value,
  placeholder,
  required,
  label: _label,
  ...props
}: FileInputProps<true | false>) {
  const ref = useRef<HTMLButtonElement>(null)

  const t = useTranslations()

  const mediaQuery = useMediaQuery('(max-width:390px)')

  const handleClick = () => {
    ref.current?.click()
  }

  useEffect(() => {
    // Check if the firstChild exists
    if (ref.current?.firstChild) {
      const firstChild = ref.current.firstChild as HTMLElement

      firstChild.style.whiteSpace = 'normal'
    }
  }, [ref.current?.firstChild])

  return (
    <Flex className='items-center'>
      <Flex className='justify-center self-stretch'>
        <Flex
          role='button'
          onClick={handleClick}
          className={cn(
            'relative top-1 z-[4] cursor-pointer items-center justify-center rounded-s-md bg-neutral-400 px-4 text-secondary hover:bg-neutral-400 dark:bg-gray-400 dark:hover:bg-gray-400',
            mediaQuery ? 'hidden' : 'flex'
          )}
        >
          {t('shared.chooseFile')}
        </Flex>
      </Flex>
      <FileInput
        required={required}
        accept='image/*, application/pdf'
        clearable
        classNames={{
          input: cn('min-h-[3rem] mt-2 bg-default-background'),
          error: 'ms-3'
        }}
        className='-my-1 -ms-2 flex-1'
        ref={ref}
        onChange={onChange as any}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    </Flex>
  )
}

export default UploadField
