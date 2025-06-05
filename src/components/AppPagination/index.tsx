'use client'

import React from 'react'
import { Pagination, PaginationRootProps } from '@mantine/core'
import { useLocale } from 'next-intl'

export interface AppPaginationProps extends PaginationRootProps {
  activeBgColor?: string
}

function AppPagination({
  activeBgColor = `linear-gradient(90deg, #041A47 0%, #0A3FAD 100%)`,
  value,
  onChange,
  total,
  ...rest
}: AppPaginationProps) {
  const locale = useLocale()
  return (
    <Pagination
      dir={locale?.startsWith('ar') ? 'rtl' : 'ltr'}
      classNames={{
        control: 'border-0'
      }}
      getItemProps={(page) => ({
        style: {
          background: page === value ? activeBgColor : 'transparent',
          color: page === value ? 'white' : '#515B6F',
          border: 'none',
          borderRadius: '8px',

          padding: '12px'
        }
      })}
      {...rest}
      value={value}
      onChange={onChange}
      total={total}
    />
  )
}

export default AppPagination
