'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import '@mantine/tiptap/styles.css'

import { Box, Flex } from '@mantine/core'
import { Link, RichTextEditor } from '@mantine/tiptap'
import TableOfContents, {
  getHierarchicalIndexes,
  TableOfContentData
} from '@tiptap-pro/extension-table-of-contents'
import Color from '@tiptap/extension-color'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import { Image } from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useTranslations } from 'next-intl'

import EditorHeader from './EditorHeader'
import EditorImage from './EditorImage'
import TableOfContent from './TableOfContent'

export interface AppEditorProps {
  content: string
  setContent: (content: string) => void
  onTableOfContentChange?: (toc: string) => void

  imageWithAlt?: boolean
}

function AppEditor({
  content,
  setContent,
  onTableOfContentChange,
  imageWithAlt = false
}: AppEditorProps) {
  const t = useTranslations()
  const [toc, setToc] = useState<TableOfContentData>([])
  const editorContainerRef = useRef<HTMLDivElement>(null)

  const handleTableOfContentChange = useCallback(
    (newToc: TableOfContentData) => {
      const serializedToc = newToc.map((item) => ({
        id: item.id,
        itemIndex: item.itemIndex,
        level: item.level,
        textContent: item.textContent
      }))
      setToc(newToc)

      onTableOfContentChange?.(JSON.stringify(serializedToc))
    },
    [onTableOfContentChange, setToc]
  )
  const imageTypeToReturn = () => {
    if (imageWithAlt) {
      return EditorImage
    }
    return Image.configure({
      inline: false
    })
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Color.configure({ types: ['textStyle'] }),
      TextStyle,
      StarterKit,
      Underline,
      Link,

      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: t('shared.editor.content') }),
      Heading.configure({
        levels: [1, 2, 3]
      }),
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(tableContent) {
          handleTableOfContentChange(tableContent)
        }
      }),
      imageTypeToReturn()
    ],
    content,
    onUpdate: ({ editor: updatedEditor }) => {
      const html = updatedEditor.getHTML()
      setContent(html)
    }
  })

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <RichTextEditor
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        minHeight: '300px'
      }}
      className='max-w-full bg-default-background'
      editor={editor}
    >
      <EditorHeader editor={editor} />
      <Flex className='h-[calc(100vh-200px)]'>
        <Box ref={editorContainerRef} className='flex-1 overflow-y-auto p-4'>
          <RichTextEditor.Content className='prose dark:prose-invert [&>*:first-child]:bg-default-background' />
        </Box>

        <Box className='flex-shrink-0 overflow-y-auto border-l border-neutral-200 bg-default-background'>
          <Box className='sticky top-0 p-4'>
            <TableOfContent
              editor={editor}
              className='h-full'
              items={toc}
              scrollContainerRef={editorContainerRef}
              style={{
                position: 'sticky'
              }}
            />
          </Box>
        </Box>
      </Flex>
    </RichTextEditor>
  )
}

export default AppEditor
