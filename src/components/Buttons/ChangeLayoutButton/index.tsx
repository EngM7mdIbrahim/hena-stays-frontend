'use client'

import { Flex, Text } from '@mantine/core'
import { LuLayoutGrid, LuLayoutList } from 'react-icons/lu'

import { LayoutType } from '@components/PropertyCard'
import { cn } from '@utils'

export interface ChangeLayoutButtonProps {
  layout: LayoutType
  setLayout: (layout: LayoutType) => void
  className?: string
}

function ChangeLayoutButton({
  setLayout,
  layout,
  className
}: ChangeLayoutButtonProps) {
  const handleChangeLayout = (value: LayoutType) => {
    setLayout(value)
  }

  return (
    <Flex
      className={cn(
        'hidden items-center justify-center rounded-full border border-neutral-200 lg:flex',
        className
      )}
    >
      <Text
        role='button'
        component='span'
        onClick={() => handleChangeLayout('horizontal')}
        className={cn(
          `cursor-pointer rounded-s-full p-3 text-sm text-neutral-700`,
          layout === 'horizontal'
            ? 'bg-neutral-200 dark:bg-default-background'
            : ''
        )}
      >
        <LuLayoutGrid />
      </Text>
      <Text
        component='span'
        role='button'
        onClick={() => handleChangeLayout('vertical')}
        className={cn(
          `cursor-pointer rounded-e-full p-3 text-sm text-neutral-700`,
          layout === 'vertical'
            ? 'bg-neutral-200 dark:bg-default-background'
            : ''
        )}
      >
        <LuLayoutList />
      </Text>
    </Flex>
  )
}

export default ChangeLayoutButton
