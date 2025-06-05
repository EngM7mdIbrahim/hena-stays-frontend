import { Box } from '@mantine/core'

import { SerializedTableOfContentItem } from '@interfaces'
import { cn } from '@utils'

export interface TableOfContentItemProps {
  item: SerializedTableOfContentItem
  onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void
}

export default function TableOfContentItem({
  item,
  onItemClick
}: TableOfContentItemProps) {
  // Calculate padding based on level
  const paddingMap: Record<number, string> = {
    1: 'ps-0',
    2: 'ps-1',
    3: 'ps-8',
    4: 'ps-12',
    5: 'ps-16'
  }

  return (
    <Box
      className={cn(
        'rounded transition-all duration-200 ease-in-out hover:bg-neutral-100',
        paddingMap[item.level] || 'pl-0'
      )}
    >
      <a
        href={`#${item.id}`}
        onClick={(e) => onItemClick(e, item.id)}
        data-item-index={item.itemIndex}
        className={cn(
          'block py-1 text-default-text no-underline before:content-[attr(data-item-index)"."]'
        )}
      >
        {item.textContent}
      </a>
    </Box>
  )
}
