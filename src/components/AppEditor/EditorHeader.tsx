'use client'

import React, { useRef } from 'react'

import '@mantine/tiptap/styles.css'

import { useUploadImages } from '@hooks'
import {
  CheckIcon,
  ComboboxItem,
  Flex,
  Group,
  ScrollArea,
  Select,
  SelectProps
} from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import { Editor } from '@tiptap/react'
import { useTranslations } from 'next-intl'
import { AiOutlinePicture } from 'react-icons/ai'
import {
  BiAlignJustify,
  BiAlignLeft,
  BiAlignRight,
  BiChevronDown
} from 'react-icons/bi'
import { FaAlignCenter } from 'react-icons/fa'

import { appNotifications, uploadImage } from '@utils'

export interface EditorHeaderProps {
  editor: Editor | null
}

const icons: Record<string, React.ReactNode> = {
  left: <BiAlignLeft />,
  center: <FaAlignCenter />,
  right: <BiAlignRight />,
  justify: <BiAlignJustify />
}

const renderSelectOption: SelectProps['renderOption'] = ({
  option,
  checked
}) => (
  <Group flex='1' gap='xs'>
    {icons[option.value]}
    <Flex className='flex-1 items-center justify-between'>
      {option.label}

      {checked && <CheckIcon size={10} />}
    </Flex>
  </Group>
)

function EditorHeader({ editor }: EditorHeaderProps) {
  const t = useTranslations()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const uploadImages = useUploadImages()

  if (!editor) return null
  const options = [
    t('shared.editor.textOptions.normal'),
    t('shared.editor.textOptions.headingOne'),
    t('shared.editor.textOptions.headingTwo'),
    t('shared.editor.textOptions.headingThree')
  ]

  const handleSelectedOption = (option: string | null) => {
    if (option === t('shared.editor.textOptions.normal')) {
      editor.chain().focus().setParagraph().run()
    }
    if (option === t('shared.editor.textOptions.headingOne')) {
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    }
    if (option === t('shared.editor.textOptions.headingTwo')) {
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    }
    if (option === t('shared.editor.textOptions.headingThree')) {
      editor.chain().focus().toggleHeading({ level: 3 }).run()
    }
  }

  const handleAlignmentOption = (option: ComboboxItem | null) => {
    if (option?.value === 'left') {
      editor.chain().focus().setTextAlign('left').run()
    }
    if (option?.value === 'center') {
      editor.chain().focus().setTextAlign('center').run()
    }
    if (option?.value === 'right') {
      editor.chain().focus().setTextAlign('right').run()
    }
    if (option?.value === 'justify') {
      editor.chain().focus().setTextAlign('justify').run()
    }
  }

  const alignmentOptions = [
    { label: t('shared.editor.textAlignment.left'), value: 'left' },
    { label: t('shared.editor.textAlignment.center'), value: 'center' },
    { label: t('shared.editor.textAlignment.right'), value: 'right' },
    { label: t('shared.editor.textAlignment.justify'), value: 'justify' }
  ]
  const optionsClassNames = {
    input: 'border-none'
  }

  const insertImage = async (file: File) => {
    const objectURL = URL.createObjectURL(file)
    editor.chain().focus().setImage({ src: objectURL }).run()

    const uploadedImageUrl = await appNotifications.promise(
      uploadImage(file, uploadImages.mutateAsync),
      {
        loading: t('shared.editor.uploading'),
        success: t('shared.editor.uploadSuccess'),
        error: t('shared.editor.uploadFailed')
      }
    )
    if (!uploadedImageUrl) return

    editor
      .chain()
      .focus()
      .updateAttributes('image', { src: uploadedImageUrl })
      .run()
  }

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      insertImage(file)
    }
  }

  return (
    <ScrollArea>
      <Flex className='items-center justify-between gap-4 border-b border-neutral-200 px-4 py-2'>
        {/* Undo/Redo Group */}

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>

        {/* Select Groups */}
        <Flex className='flex-1 gap-2'>
          <Select
            className='min-w-[120px]'
            checkIconPosition='right'
            rightSection={<BiChevronDown className='text-neutral-500' />}
            defaultValue={options[0]}
            data={options}
            allowDeselect={false}
            classNames={optionsClassNames}
            onChange={handleSelectedOption}
          />
          <Select
            className='min-w-[120px]'
            checkIconPosition='right'
            rightSection={<BiChevronDown className='text-neutral-500' />}
            defaultValue={alignmentOptions[0]?.value}
            data={alignmentOptions}
            renderOption={renderSelectOption}
            classNames={optionsClassNames}
            allowDeselect={false}
            onChange={(_, option) => handleAlignmentOption(option)}
          />
        </Flex>

        {/* Color Picker */}
        <RichTextEditor.ColorPicker
          colors={[
            '#25262b',
            '#868e96',
            '#fa5252',
            '#e64980',
            '#be4bdb',
            '#7950f2',
            '#4c6ef5',
            '#228be6',
            '#15aabf',
            '#12b886',
            '#40c057',
            '#82c91e',
            '#fab005',
            '#fd7e14'
          ]}
        />

        {/* Text Formatting Tools */}
        <Flex className='items-center gap-1'>
          <RichTextEditor.Bold className='rounded-md p-2 transition-colors hover:bg-gray-100' />
          <RichTextEditor.Italic className='rounded-md p-2 transition-colors hover:bg-gray-100' />
          <RichTextEditor.Underline className='rounded-md p-2 transition-colors hover:bg-gray-100' />
          <RichTextEditor.Strikethrough className='rounded-md p-2 transition-colors hover:bg-gray-100' />
        </Flex>

        {/* Additional Formatting Tools */}
        <Flex className='items-center gap-1'>
          <RichTextEditor.Highlight className='rounded-md p-2 transition-colors hover:bg-gray-100' />
          <RichTextEditor.Code className='rounded-md p-2 transition-colors hover:bg-gray-100' />
        </Flex>

        {/* List and Media Tools */}
        <Flex className='flex items-center gap-1'>
          <RichTextEditor.BulletList className='rounded-md p-2 transition-colors hover:bg-gray-100' />
          <RichTextEditor.OrderedList className='rounded-md p-2 transition-colors hover:bg-gray-100' />
          <RichTextEditor.Link className='rounded-md p-2 transition-colors hover:bg-gray-100' />
          <RichTextEditor.Blockquote className='rounded-md p-2 transition-colors hover:bg-gray-100' />
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            className='hidden'
            onChange={handleFileInputChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            type='button'
            className='rounded-md p-2 transition-colors hover:bg-gray-100'
          >
            <AiOutlinePicture className='h-4 w-4 text-neutral-600' />
          </button>
        </Flex>
      </Flex>
    </ScrollArea>
  )
}

export default EditorHeader
