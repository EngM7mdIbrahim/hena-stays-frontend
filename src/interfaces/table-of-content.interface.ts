import { TableOfContentDataItem } from '@tiptap-pro/extension-table-of-contents'

export type SerializedTableOfContentItem = Pick<
  TableOfContentDataItem,
  'id' | 'itemIndex' | 'level' | 'textContent'
>

export type SerializedTableOfContent = Array<SerializedTableOfContentItem>
