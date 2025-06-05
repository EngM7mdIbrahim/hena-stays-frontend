import { useEffect, useRef, useState } from 'react'
import { Media, MediaTypes, SOCKET_EVENTS } from '@commonTypes'
import { useSocketIO, useUploadImages } from '@hooks'
import {
  ActionIcon,
  Flex,
  Popover,
  ScrollArea,
  TextInput,
  UnstyledButton
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { MESSAGE_SCHEMA } from '@schemas/chat'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useLocale, useTranslations } from 'next-intl'
import { BiSend } from 'react-icons/bi'
import { FiPaperclip } from 'react-icons/fi'
import { HiPhotograph } from 'react-icons/hi'
import { MdEmojiEmotions } from 'react-icons/md'
import { z } from 'zod'

import AppModal from '@components/Modals/AppModal'
import { appNotifications, cn, uploadImage } from '@utils'

import MessageMediaPreview from './MessageMediaPreview'

export interface MessageBoxFormProps {
  className?: string
  chatId: string
}

export function MessageBoxForm({ className, chatId }: MessageBoxFormProps) {
  const t = useTranslations()
  const locale = useLocale()
  const form = useForm<z.infer<typeof MESSAGE_SCHEMA>>({
    initialValues: {
      text: '',
      media: []
    },
    validate: zodResolver(MESSAGE_SCHEMA)
  })
  const [previewOpen, setPreviewOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadImages = useUploadImages()
  const { emitEvent } = useSocketIO()
  // Handlers
  const handleSelectingMedia = () => {
    fileInputRef.current?.click()
  }

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (files) {
      form.setFieldValue('media', [...form.values.media, ...Array.from(files)])
    }
    // Clear the input value to allow reselecting the same file
    const input = event.target
    input.value = ''
    setPreviewOpen(false)
  }

  const handleRemoveMedia = (index: number) => {
    URL.revokeObjectURL(URL.createObjectURL(form.values.media[index]))
    form.setFieldValue(
      'media',
      form.values.media.filter((_, i) => i !== index)
    )
  }

  const handleSend = async (values: typeof form.values) => {
    const media: Media[] = await Promise.all(
      values.media.map(async (file) => {
        let url = ''

        url = await uploadImage(file, uploadImages.mutateAsync)

        return {
          url,
          type: file?.type.includes(MediaTypes.Image)
            ? MediaTypes.Image
            : MediaTypes.Video
        }
      })
    )

    // Check if any media upload failed
    if (media.some((item) => !item.url)) {
      appNotifications.error(t('errorMessages.shared.mediaUploadFailed'))
      return
    }

    // Create message with uploaded media
    emitEvent(SOCKET_EVENTS.NEW_MESSAGE, {
      message: {
        text: values.text,
        media,
        chat: chatId
      }
    })

    form.reset()
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const { text } = form.values
    const newText = text + emojiData.emoji
    form.setFieldValue('text', newText)
  }

  // Handle Typing events
  useEffect(() => {
    if (form.values.text.length > 0) {
      setTyping(true)
    } else {
      setTyping(false)
    }
  }, [form.values.text])
  useEffect(() => {
    if (typing) {
      emitEvent(SOCKET_EVENTS.USER_TYPING, {
        chatId
      })
    } else {
      emitEvent(SOCKET_EVENTS.USER_STOP_TYPING, {
        chatId
      })
    }
  }, [typing])
  return (
    <form
      onSubmit={form.onSubmit(handleSend)}
      className={cn(
        'relative mt-[2rem] flex items-center border-t bg-transparent p-4',
        className
      )}
    >
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*,video/*'
        multiple
        onChange={handleMediaChange}
      />

      {form.values.media.length > 0 && (
        <AppModal
          open={previewOpen}
          setOpen={setPreviewOpen}
          title={`${t('chat.images')} (${form.values.media.length})`}
          size='lg'
          trigger={
            <ActionIcon variant='transparent' color='gray'>
              <HiPhotograph size={20} />
            </ActionIcon>
          }
        >
          <ScrollArea h={400}>
            <Flex gap='md' wrap='wrap'>
              {form.values.media.map((file) => (
                <MessageMediaPreview
                  key={file.name}
                  file={file}
                  onRemove={(removeFile) =>
                    handleRemoveMedia(form.values.media.indexOf(removeFile))
                  }
                />
              ))}
            </Flex>
          </ScrollArea>
        </AppModal>
      )}

      <TextInput
        classNames={{
          input:
            'w-full rounded-full border border-neutral-400 h-10 bg-default-background pr-16'
        }}
        {...form.getInputProps('text')}
        placeholder={t('chat.fields.messagePlaceholder')}
        className='me-2 flex-grow rounded-full'
        rightSection={
          <UnstyledButton onClick={handleSelectingMedia}>
            <FiPaperclip size={20} />
          </UnstyledButton>
        }
        leftSection={
          <Popover
            opened={emojiPickerOpen}
            onChange={setEmojiPickerOpen}
            position='top-start'
            offset={5}
            withArrow
            shadow='md'
          >
            <Popover.Target>
              <ActionIcon
                variant='transparent'
                color='gray'
                onClick={() => setEmojiPickerOpen((o) => !o)}
              >
                <MdEmojiEmotions size={20} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown p={0} bg='transparent'>
              <EmojiPicker
                skinTonesDisabled
                onEmojiClick={handleEmojiClick}
                autoFocusSearch={false}
                width={300}
                height={400}
              />
            </Popover.Dropdown>
          </Popover>
        }
        size='md'
      />

      <ActionIcon
        type='submit'
        loading={uploadImages.isPending}
        className='mx-1 rounded-full bg-secondary-gradient p-2 text-white'
        size='xl'
      >
        <BiSend
          className={cn('rotate-0', locale.startsWith('ar') && 'rotate-180')}
          size={24}
        />
      </ActionIcon>
    </form>
  )
}
