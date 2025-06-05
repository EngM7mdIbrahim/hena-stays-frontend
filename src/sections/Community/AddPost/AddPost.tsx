import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Media, MediaTypes, Post } from '@commonTypes'
import { DEFAULT_ADD_POST_FORM_DATA } from '@constants'
import { useCreatePost, useUpdatePost, useUploadImages, useUser } from '@hooks'
import {
  ActionIcon,
  Alert,
  Button,
  Flex,
  Input,
  Stack,
  Text
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { ADD_POST_FORM_SCHEMA } from '@schemas'
import { useTranslations } from 'next-intl'
import { HiLocationMarker } from 'react-icons/hi'
import { IoMdPhotos } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { PiPencil } from 'react-icons/pi'
import { RxCrossCircled } from 'react-icons/rx'

import PrimaryButton from '@components/Buttons/PrimaryButton'
import LocationField from '@components/CustomFields/LocationField'
import TextareaField from '@components/CustomFields/TextareaField'
import AppModal from '@components/Modals/AppModal'
import UploadMultipleFiles, { FileItem } from '@components/UploadMultipleFiles'
import UserCard from '@components/UserCard'
import { appNotifications, uploadImage } from '@utils'

export interface AddPostProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  post?: Post | null
  isEdit?: boolean
}

function AddPost({ setOpen, post, isEdit }: AddPostProps) {
  const t = useTranslations()
  const form = useForm<
    Omit<typeof DEFAULT_ADD_POST_FORM_DATA, 'media'> & { media: FileItem[] }
  >({
    initialValues: DEFAULT_ADD_POST_FORM_DATA,

    validate: zodResolver(ADD_POST_FORM_SCHEMA(t))
  })

  useEffect(() => {
    if (isEdit && post) {
      form.setValues({
        description: post.description,
        media: post.media.map((mediaItem) => ({
          file: new File([mediaItem.url], mediaItem.url, {
            type: mediaItem.type
          }),
          preview: mediaItem.url
        })),
        location: post.location
      })
    }
  }, [isEdit, post])

  const { user } = useUser()
  const [openUploadModal, setOpenUploadModal] = useState(false)

  const removeFile = (index: number) => {
    if (!form.getValues().media[index].preview)
      URL.revokeObjectURL(form.getValues().media[index].preview)

    form.setFieldValue(
      'media',
      form.getValues().media.filter((_, i) => i !== index)
    )
  }

  const uploadImages = useUploadImages()

  const createPost = useCreatePost({
    onSuccess: () => {
      setOpen(false)
      appNotifications.success(
        t('successMessages.createdSuccessfully', {
          item: t('community.post')
        })
      )
    }
  })

  const updatePost = useUpdatePost({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('community.post')
        })
      )
      setOpen(false)
    }
  })

  const onSubmit = async (
    data: Omit<typeof DEFAULT_ADD_POST_FORM_DATA, 'media'> & {
      media: FileItem[]
    }
  ) => {
    const media: Media[] = await Promise.all(
      data.media.map(async (image) => {
        let url = ''
        if (image.file.name.includes('storage.googleapis.com')) {
          return {
            url: image.file.name,
            type: image?.file?.type.includes('image')
              ? MediaTypes.Image
              : MediaTypes.Video
          }
        }
        url = (await uploadImage(
          image?.file,
          uploadImages.mutateAsync
        )) as string

        return {
          url,
          type: image?.file?.type.includes('image')
            ? MediaTypes.Image
            : MediaTypes.Video
        }
      })
    )

    if (media.some((item) => !item.url)) {
      appNotifications.error(t('errorMessages.shared.mediaUploadFailed'))
      return
    }

    const dataToSend = {
      ...data,
      media
    }

    if (isEdit && post) {
      updatePost.mutate({ id: post._id, ...dataToSend })
    } else {
      createPost.mutate(dataToSend)
    }
  }

  const HoveringErrors = useMemo(
    () =>
      form.errors.media && form.errors.location
        ? () => (
            <>
              {form.errors.media && <Text>{form.errors.media}</Text>}
              <br />
              {form.errors.location && <Text>{form.errors.location}</Text>}
            </>
          )
        : null,
    [form.errors]
  )

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className='flex flex-col'>
      <Flex className='mb-4 flex items-center gap-2'>
        <HiLocationMarker
          className='cursor-pointer'
          color='#e95444'
          size={26}
        />
        <Text size='sm'>{form.getValues().location.address}</Text>
        <LocationField
          value={form.getValues().location}
          onChange={(location) => form.setFieldValue('location', location)}
        >
          <ActionIcon variant='transparent'>
            <PiPencil className='text-default-text' />
          </ActionIcon>
        </LocationField>
      </Flex>
      {HoveringErrors && (
        <Alert
          icon={<RxCrossCircled />}
          variant='light'
          title='Error'
          color='red'
          className='w-full'
        >
          <HoveringErrors />
        </Alert>
      )}
      <Stack className='h-[15rem] gap-4 rounded-lg border border-neutral-200 px-3 py-4'>
        <UserCard user={user} />

        <TextareaField
          className='h-[8rem] border-0'
          {...form.getInputProps('description')}
          placeholder={t('community.postForm.placeholders.whatIsOnYourMind', {
            username: user?.name || ''
          })}
        />
      </Stack>
      <Flex className='mt-4 flex-wrap gap-4'>
        {form.getValues().media.map((file, index) => (
          <Flex
            key={file.file.name}
            className='relative h-40 w-40 rounded-lg border border-neutral-200 p-2'
          >
            {file.file.type.includes('image') ? (
              <Image
                src={file.preview}
                alt={`Uploaded file ${index}`}
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
              />
            ) : (
              <video controls className='h-full w-full rounded-lg object-cover'>
                <track default kind='captions' src='SUBTITLE_PATH' />
                <source src={file.preview} type='video/mp4' />
                Your browser does not support the video.
              </video>
            )}

            <button
              type='button'
              className='absolute right-1 top-1 rounded-full bg-error-500 p-2 text-white'
              onClick={() => removeFile(index)}
            >
              <IoClose size={16} />
            </button>
          </Flex>
        ))}
      </Flex>
      <Flex
        gap={30}
        justify='space-between'
        align='center'
        mt={20}
        className='rounded-md border border-neutral-200 p-3'
      >
        <Text className='text-neutral-600'>
          {t('community.postForm.placeholders.addToYourPost')}
        </Text>
        <Flex gap={10}>
          <AppModal
            open={openUploadModal}
            setOpen={setOpenUploadModal}
            size='lg'
            title={t('community.postForm.placeholders.addImageOrVideo')}
            trigger={
              <IoMdPhotos
                className='cursor-pointer'
                color='#5cbc67'
                size={26}
              />
            }
          >
            <div className='space-y-4'>
              <UploadMultipleFiles
                onFilesChange={(files) => form.setFieldValue('media', files)}
                value={form.getValues().media}
              />
              <PrimaryButton
                onClick={() => setOpenUploadModal(false)}
                type='button'
                className='w-full rounded-full'
                size='md'
              >
                {t('shared.buttons.done')}
              </PrimaryButton>
            </div>
          </AppModal>
          <LocationField
            value={form.getValues().location}
            onChange={(location) => form.setFieldValue('location', location)}
          >
            <ActionIcon variant='transparent'>
              <HiLocationMarker
                className='cursor-pointer'
                color='#e95444'
                size={26}
              />
            </ActionIcon>
          </LocationField>
        </Flex>
      </Flex>
      <Input.Error className='mt-2 text-xs'>{form.errors.media}</Input.Error>
      <Flex gap={30} justify='space-between' align='center' mt={20}>
        <Button
          onClick={() => setOpen(false)}
          radius='full'
          color='gray'
          size='md'
          className='w-1/2 rounded-full'
        >
          {t('shared.buttons.back')}
        </Button>
        <PrimaryButton
          loading={
            uploadImages.isPending ||
            createPost.isPending ||
            updatePost.isPending
          }
          type='submit'
          className='w-1/2 rounded-full text-secondary'
          size='md'
        >
          {isEdit ? t('shared.buttons.update') : t('community.buttons.post')}
        </PrimaryButton>
      </Flex>
    </form>
  )
}

export default AddPost
