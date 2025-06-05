import { RefObject } from 'react'
import { Box, Stack, Text } from '@mantine/core'
import { TableOfContentData } from '@tiptap-pro/extension-table-of-contents'
import { TextSelection } from '@tiptap/pm/state'
import { Editor } from '@tiptap/react'
import { useTranslations } from 'next-intl'

import { cn } from '@utils'

import TableOfContentItem from './TableOfContentItem'

export interface TableOfContentProps {
  items: TableOfContentData
  editor?: Editor | null
  scrollContainerRef: RefObject<HTMLDivElement>
  className?: string
  style?: React.CSSProperties
  isEditing?: boolean
}

export function TableOfContentEmptyState({
  className
}: Pick<TableOfContentProps, 'className'>) {
  return (
    <Box className={cn('select-none text-neutral-500', className)}>
      <Text>Start editing your document to see the outline.</Text>
    </Box>
  )
}

export default function TableOfContent({
  items = [],
  editor,
  scrollContainerRef,
  className,
  style,
  isEditing = false
}: TableOfContentProps) {
  const t = useTranslations()
  if (items.length === 0 && isEditing) {
    return <TableOfContentEmptyState className={className} />
  }

  const onItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()

    if (editor && scrollContainerRef.current) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"]`)
      if (!element) return

      const pos = editor.view.posAtDOM(element, 0)
      const { tr } = editor.view.state
      tr.setSelection(new TextSelection(tr.doc.resolve(pos)))
      editor.view.dispatch(tr)
      editor.view.focus()

      const container = scrollContainerRef.current
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const relativeTop =
        elementRect.top - containerRect.top + container.scrollTop

      container.scrollTo({
        top: relativeTop - 20,
        behavior: 'smooth'
      })
    } else {
      const element = document.getElementById(id)
      if (!element) return

      if (window.history.pushState) {
        window.history.pushState(null, '', `#${id}`)
      }
      const elementRect = element.getBoundingClientRect()
      const scrollTop = elementRect.top + window.scrollY - 80

      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <aside
      className={cn(
        'top-10 w-60 border-neutral-200 sm:w-full lg:w-80',
        className
      )}
      style={style}
    >
      <Text component='h2' className='text-lg font-bold text-neutral-500'>
        {items.length > 0 ? t('shared.editor.toc') : t('shared.editor.noToc')}
      </Text>
      <Stack className='gap-1 overflow-auto text-sm no-underline'>
        {items
          .filter((item) => item.level === 2)
          .map((item) => (
            <TableOfContentItem
              key={item.id}
              onItemClick={onItemClick}
              item={item}
            />
          ))}
      </Stack>
    </aside>
  )
}
