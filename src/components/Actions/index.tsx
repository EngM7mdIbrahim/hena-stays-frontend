import React from 'react'
import { Menu, MenuProps } from '@mantine/core'
import { useTranslations } from 'next-intl'

export interface ActionItem {
  label: string
  icon: React.ReactNode
  onClick: (e: React.MouseEvent) => void
}

export interface ActionsProps extends MenuProps {
  targetTrigger: React.ReactNode
  items: ActionItem[]
}

function Actions({
  targetTrigger,
  items,
  width = 200,
  ...props
}: ActionsProps) {
  const t = useTranslations()
  return (
    <Menu {...props} shadow='md' width={width}>
      <Menu.Target>{targetTrigger}</Menu.Target>
      <Menu.Dropdown>
        {items.map((item) => (
          <Menu.Item
            className={
              item?.label?.includes(t('navigation.logout')) ||
              (item?.label?.includes(t('shared.actions.delete')) &&
                !item?.label?.includes(t('navigation.login')))
                ? 'text-error-500'
                : 'text-default-text'
            }
            key={item.label}
            onClick={item?.onClick}
            leftSection={item?.icon}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}

export default Actions
