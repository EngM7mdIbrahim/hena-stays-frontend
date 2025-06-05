import React, { useMemo } from 'react'
import { Box } from '@mantine/core'

export interface ItemsWrapperProps {
  children: Iterable<JSX.Element>
  loading: boolean
  LoadingComponent: JSX.Element | null
  EmptyComponent?: JSX.Element
  className?: string
}

export default function ItemsWrapper({
  children,
  loading,
  LoadingComponent,
  EmptyComponent = <>No Items</>,
  className
}: ItemsWrapperProps) {
  const isEmpty = useMemo(
    () => Array.from(children ?? [])?.length === 0,
    [children]
  )
  if (loading) {
    return (
      <Box className={className}>
        {Array.from({ length: 5 }).map(
          (num) =>
            LoadingComponent &&
            React.cloneElement(LoadingComponent, {
              key: `loading-${num}-${Math.random()}`
            })
        )}
      </Box>
    )
  }
  if (isEmpty) {
    return <Box>{EmptyComponent}</Box>
  }
  return <Box className={className}>{children}</Box>
}
