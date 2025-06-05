import React, { useState } from 'react'
import { SaleTypeEnum } from '@commonTypes'
import { Box, Flex, ScrollArea, Text } from '@mantine/core'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

import ProjectsQuickSearch from './DropdownContnets/ProjectsQuickSearch'
import PropertiesQuickSearch from './DropdownContnets/PropertiesQuickSearch'
import RequestPropertyLanding from './DropdownContnets/RequestPropertyLanding'

export interface DropdownItemProps {
  selected?: boolean
  label: string
  onClick: () => void
}

function DropdownItem({ selected, label, onClick }: DropdownItemProps) {
  return (
    <Text
      onClick={onClick}
      component='button'
      className={cn(
        'cursor-pointer whitespace-nowrap rounded-t-xl px-4 py-2 uppercase text-primary dark:bg-secondary',
        selected && '!bg-blue-300 text-default-background'
      )}
    >
      {label}
    </Text>
  )
}

export interface LandingHeaderDropdownProps {
  className?: string
}

function LandingHeaderDropdown({ className }: LandingHeaderDropdownProps) {
  const t = useTranslations()
  const [selected, setSelected] = useState<string>('Request your property')

  const handleSelect = (label: string) => {
    setSelected(label) // Toggle the dropdown if clicked again
  }
  const renderDropdownContent = () => {
    switch (selected) {
      case 'Request your property':
        return <RequestPropertyLanding />
      case 'Rent':
        return <PropertiesQuickSearch type={SaleTypeEnum.Rent} />
      case 'Buy':
        return <PropertiesQuickSearch type={SaleTypeEnum.Sale} />
      case 'Projects':
        return <ProjectsQuickSearch />
      default:
        return null
    }
  }

  return (
    <Box className={cn('relative', className)}>
      <ScrollArea>
        <Flex className='gap-4'>
          <DropdownItem
            selected={selected === 'Request your property'}
            label={t('homePage.hero.dropdown.requestProperty')}
            onClick={() => handleSelect('Request your property')}
          />
          <DropdownItem
            selected={selected === 'Rent'}
            label={t('homePage.hero.dropdown.rent')}
            onClick={() => handleSelect('Rent')}
          />
          <DropdownItem
            selected={selected === 'Buy'}
            label={t('homePage.hero.dropdown.buy')}
            onClick={() => handleSelect('Buy')}
          />
          <DropdownItem
            selected={selected === 'Projects'}
            label={t('homePage.hero.dropdown.projects')}
            onClick={() => handleSelect('Projects')}
          />

          {/* Dropdown Content */}
        </Flex>
      </ScrollArea>
      {selected && (
        <Box className='relative left-0 top-0 w-full'>
          {renderDropdownContent()}
        </Box>
      )}
    </Box>
  )
}

export default LandingHeaderDropdown
