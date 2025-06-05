import { useState } from 'react'
import NextImage from 'next/image'
import { Box, Button, Text, TextInput } from '@mantine/core'
import Image from '@tiptap/extension-image'
import {
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer
} from '@tiptap/react'
import { useTranslations } from 'next-intl'

import AppModal from '@components/Modals/AppModal'

function ImageNode({ selected, updateAttributes, node }: NodeViewProps) {
  const t = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [altText, setAltText] = useState(node.attrs.alt)
  const { src, alt } = node.attrs

  let className = 'w-[300px] relative'
  if (selected) {
    className += ' ProseMirror-selectednode'
  }

  const onEditAlt = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    if (altText.trim() !== '') {
      updateAttributes({ alt: altText })
      setIsModalOpen(false)
    }
  }

  return (
    <NodeViewWrapper className={className} data-drag-handle>
      <AppModal
        title={t('shared.editor.altText.title')}
        open={isModalOpen}
        setOpen={() => setIsModalOpen(false)}
      >
        <form
          className='flex flex-col gap-4'
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <TextInput
            label={t('shared.editor.altText.altText')}
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder={t('shared.editor.altText.enterAltText')}
          />
          <Button onClick={handleSubmit} fullWidth>
            {t('shared.buttons.save')}
          </Button>
        </form>
      </AppModal>
      <NextImage
        width={300}
        height={300}
        className='h-full w-full'
        src={src}
        alt={alt}
      />
      <Box className='absolute bottom-2 left-2 flex max-w-[calc(100%-4px)] items-baseline gap-2 overflow-hidden rounded-md border border-neutral-400 bg-default-background p-3 text-sm shadow-md'>
        {alt ? (
          <Text component='span' className='text-success-500'>
            ✔
          </Text>
        ) : (
          <Text component='span' className='text-error-500'>
            !
          </Text>
        )}
        {alt ? (
          <Text component='span' className='text-sm'>
            {t('shared.editor.altText.altText')}: &quot;{alt}&quot;
          </Text>
        ) : (
          <Text component='span' className='text-sm'>
            {t('shared.editor.altText.altTextMissing')}
          </Text>
        )}
        <button
          className='underline hover:no-underline'
          type='button'
          onClick={onEditAlt}
        >
          {t('shared.actions.edit')}
        </button>
      </Box>
    </NodeViewWrapper>
  )
}

export default Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode)
  }
})
