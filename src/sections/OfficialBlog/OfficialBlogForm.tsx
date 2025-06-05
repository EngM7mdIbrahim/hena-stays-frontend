'use client'

import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Media, MediaTypes, UpdateOfficialBlogRequest } from '@commonTypes'
import { DEFAULT_OFFICIAL_BLOGS_FORM_DATA, navigationLinks } from '@constants'
import {
  useCreateOfficialBlog,
  useOfficialBlogsList,
  useUpdateOfficialBlog,
  useUploadImages,
  useUser
} from '@hooks'
import { Box, Card, Input, Loader, Stack, TagsInput, Text } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import { OFFICIAL_BLOGS_FORM_SCHEMA } from '@schemas'
import { useTranslations } from 'next-intl'
import { BsSearch, BsTrash } from 'react-icons/bs'

import AppEditor from '@components/AppEditor'
import PrimaryButton from '@components/Buttons/PrimaryButton'
import CheckboxField from '@components/CustomFields/CheckboxField'
import DateField from '@components/CustomFields/DateField'
import MultiSelectField from '@components/CustomFields/MultiSelectField'
import TextareaField from '@components/CustomFields/TextareaField'
import TextField from '@components/CustomFields/TextField'
import FullScreenError from '@components/FullScreenError'
import UploadFile from '@components/UploadFile'
import { appNotifications, cn, uploadImage } from '@utils'

export interface OfficialBlogFormProps {
  isEdit?: boolean
  defaultValues?: Omit<
    UpdateOfficialBlogRequest,
    'media' | 'id' | 'relatedBlogs' | 'faq' | 'scheduledAt'
  >
}

function OfficialBlogForm({ isEdit, defaultValues }: OfficialBlogFormProps) {
  const t = useTranslations()
  const { user } = useUser()
  const router = useRouter()

  const {
    blogs,
    isLoading,
    isError,
    error,

    text,
    setText
  } = useOfficialBlogsList({})

  const blogsOptions = useMemo(() => {
    return blogs.map((blog) => ({
      label: blog.title,
      value: `${blog.title}-${blog._id}`
    }))
  }, [blogs, text, isLoading])

  const form = useForm({
    initialValues: DEFAULT_OFFICIAL_BLOGS_FORM_DATA,
    validate: zodResolver(OFFICIAL_BLOGS_FORM_SCHEMA(t)),
    mode: 'controlled'
  })

  const createOfficialBlog = useCreateOfficialBlog({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.createdSuccessfully', {
          item: t('community.blog')
        })
      )
      router.push(navigationLinks.admin.officialBlogs.allOfficialBlogs)
    }
  })

  const updateOfficialBlog = useUpdateOfficialBlog({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('community.blog')
        })
      )
      router.push(navigationLinks.admin.officialBlogs.allOfficialBlogs)
    }
  })

  const uploadImages = useUploadImages()

  useEffect(() => {
    if (isEdit && defaultValues) {
      form.setValues(defaultValues)
    }
  }, [defaultValues, isEdit])

  const handleAddNewFaq = () => {
    form.insertListItem('faq', {
      question: '',
      answer: '',
      key: randomId()
    })
  }

  const handleRemoveFaq = (index: number) => {
    form.removeListItem('faq', index)
  }

  const handleDisableAddFaq = () => {
    if (
      form.values.faq?.length >= 1 &&
      form.values.faq[0]?.question?.trim() === '' &&
      form.values.faq[0]?.answer?.trim() === ''
    ) {
      return true
    }
    return false
  }

  const handleSubmit = async (
    data: typeof DEFAULT_OFFICIAL_BLOGS_FORM_DATA
  ) => {
    let media: Media & { alt: string } = {
      type: MediaTypes.Image,
      url: '',
      alt: ''
    }
    if (data.media) {
      if ((data.media as File).name.includes('storage.googleapis.com')) {
        media = {
          url: (data.media as File).name,
          type: MediaTypes.Image,
          alt: data.altText || ''
        }
      } else {
        const mediaUrl = await uploadImage(data.media, uploadImages.mutateAsync)
        media = {
          url: mediaUrl,
          type: MediaTypes.Image,
          alt: data.altText || ''
        }
      }
      if (!media.url) {
        appNotifications.error('Media upload failed')
        return
      }

      const dataToSend = {
        ...data,
        media,
        relatedBlogs: data.relatedBlogs.map((blog) => blog.split('-')[1]),
        // TODO: Fix the undefined
        scheduledAt: data.scheduledAt || undefined
      }

      if (isEdit && defaultValues) {
        updateOfficialBlog.mutate({
          id: (defaultValues as { _id: string })._id,
          ...dataToSend
        })
      } else {
        createOfficialBlog.mutate({
          ...dataToSend,
          createdBy: user ? user._id : ''
        })
      }
    }
  }

  if (isError && error) {
    return <FullScreenError error={error} />
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className='flex flex-col gap-8 px-4 py-12'
    >
      <TextField
        label={t('shared.fields.title')}
        placeholder={t('shared.placeholders.title', {
          type: t('community.blog')
        })}
        required
        {...form.getInputProps('title')}
        withAsterisk
      />

      <TextareaField
        label={t('shared.fields.description')}
        placeholder={t('shared.placeholders.description', {
          type: t('community.blog')
        })}
        required
        {...form.getInputProps('description')}
        className='min-h-[200px]'
      />

      <TextField
        label={t('officialBlogs.officialBlogForm.fields.permalink')}
        placeholder={t('officialBlogs.officialBlogForm.placeholders.permalink')}
        type='text'
        required
        {...form.getInputProps('slug')}
      />

      <Box className='space-y-2'>
        <UploadFile
          placeholder={t('shared.fields.media', {
            itemName: t('officialBlogs.title')
          })}
          file={form.values.media}
          onFileChange={(file) =>
            form.setFieldValue(
              'media',
              file as typeof DEFAULT_OFFICIAL_BLOGS_FORM_DATA.media
            )
          }
        />
        {form?.errors?.media && (
          <Input.Error>{form?.errors?.media}</Input.Error>
        )}
      </Box>

      {form.values.media && (
        <TextField
          label={t('shared.editor.altText.altText')}
          placeholder={t('shared.editor.altText.enterAltText')}
          required
          {...form.getInputProps('altText')}
        />
      )}

      <AppEditor
        content={form.values.content}
        setContent={(content) => form.setFieldValue('content', content)}
        onTableOfContentChange={(toc) =>
          form.setFieldValue('tableOfContents', toc)
        }
        imageWithAlt
      />
      {form.errors.content && (
        <Input.Error className='text-sm'>{form.errors.content}</Input.Error>
      )}

      <Card className='flex flex-col gap-4 rounded-md border border-neutral-400 bg-default-background p-4 shadow-md'>
        <Stack className='flex flex-col gap-4'>
          <Text
            component='label'
            className='text-sm font-bold text-neutral-500'
          >
            {t('officialBlogs.officialBlogForm.fields.faq.label')}
          </Text>
          {form.values?.faq?.map((field, index) => (
            <Stack key={field.key} className='gap-3'>
              <Stack className='gap-3'>
                <Text
                  component='span'
                  className='text-sm font-bold text-neutral-500'
                >
                  {t(
                    'officialBlogs.officialBlogForm.fields.faq.fields.question'
                  )}{' '}
                  {index + 1}
                </Text>
                <AppEditor
                  content={form.values.faq[index].question}
                  setContent={(content) =>
                    form.setFieldValue(`faq.${index}.question`, content)
                  }
                  imageWithAlt
                />
              </Stack>
              <Stack>
                <Text
                  component='span'
                  className='text-sm font-bold text-neutral-500'
                >
                  {t('officialBlogs.officialBlogForm.fields.faq.fields.answer')}{' '}
                  {index + 1}
                </Text>
                <AppEditor
                  content={form.values.faq[index].answer}
                  setContent={(content) =>
                    form.setFieldValue(`faq.${index}.answer`, content)
                  }
                  imageWithAlt
                />
              </Stack>

              {form.values.faq.length > 1 && (
                <button
                  type='button'
                  onClick={() => handleRemoveFaq(index)}
                  className='w-full rounded-full border border-neutral-200 py-2 font-semibold text-neutral-500 transition-colors duration-200 hover:bg-neutral-100'
                >
                  <BsTrash size={20} className='mx-auto' />
                </button>
              )}
            </Stack>
          ))}
          <button
            disabled={handleDisableAddFaq()}
            className='w-full rounded-full border border-neutral-400 bg-transparent py-3 font-semibold shadow-md transition-colors duration-200 hover:bg-neutral-100 disabled:cursor-not-allowed'
            type='button'
            onClick={handleAddNewFaq}
          >
            {t('shared.buttons.add')}{' '}
            {t('officialBlogs.officialBlogForm.fields.faq.label')}
          </button>
        </Stack>
      </Card>

      <Card className='flex flex-col gap-4 rounded-md border border-neutral-400 bg-default-background p-6 shadow-md'>
        <TextField
          label={`${t('officialBlogs.officialBlogForm.fields.seo.label')} ${t('officialBlogs.officialBlogForm.fields.seo.fields.title')}`}
          placeholder={t(
            'officialBlogs.officialBlogForm.placeholders.seo.title'
          )}
          type='text'
          {...form.getInputProps('seo.title')}
          required
        />

        <TextareaField
          label={`${t('officialBlogs.officialBlogForm.fields.seo.label')} ${t('officialBlogs.officialBlogForm.fields.seo.fields.description')}`}
          placeholder={t(
            'officialBlogs.officialBlogForm.placeholders.seo.description'
          )}
          {...form.getInputProps('seo.description')}
          required
          className='min-h-[200px]'
        />
        <TagsInput
          acceptValueOnBlur={false}
          className='flex-1'
          classNames={{
            pill: 'bg-default-background',
            input: cn(
              'w-full rounded-md mt-2 bg-default-background  border border-neutral-400  focus:border-neutral-300 focus:outline-none'
            )
          }}
          onRemove={(value) => {
            form.setFieldValue(
              'seo.keywords',
              form.values.seo.keywords.filter(
                (keyword: string) => keyword !== value
              )
            )
          }}
          {...form.getInputProps('seo.keywords')}
          size='md'
          placeholder={t(
            'officialBlogs.officialBlogForm.placeholders.seo.keywords'
          )}
          label={
            <Text component='label'>
              <Text
                component='span'
                className='text-sm font-bold text-neutral-500'
              >
                {t('officialBlogs.officialBlogForm.fields.seo.label')}{' '}
                {t('officialBlogs.officialBlogForm.fields.seo.fields.keywords')}
              </Text>
            </Text>
          }
        />
      </Card>

      <MultiSelectField
        {...form.getInputProps('relatedBlogs')}
        label={t('officialBlogs.officialBlogForm.fields.relatedBlogs')}
        data={blogsOptions}
        searchValue={text}
        onSearchChange={setText}
        placeholder={t(
          'officialBlogs.officialBlogForm.placeholders.relatedBlogs'
        )}
        required={false}
        maxValues={3}
        size='md'
        searchable
        leftSection={isLoading ? <Loader size='xs' /> : <BsSearch size={20} />}
      />

      <CheckboxField
        value='published'
        checked={form.values.published}
        onChange={() => {
          form.setFieldValue('published', !form.values.published)
          if (form.values.published) {
            form.setFieldValue('scheduledAt', null)
          }
        }}
        label={t('officialBlogs.officialBlogForm.fields.publishBlog')}
      />

      <Stack gap={4}>
        <DateField
          size='lg'
          label={t('officialBlogs.officialBlogForm.fields.scheduledAt')}
          placeholder={t(
            'officialBlogs.officialBlogForm.placeholders.scheduledAt'
          )}
          value={form.values.scheduledAt}
          onChange={(value) => {
            form.setFieldValue('scheduledAt', value)
            if (value) {
              form.setFieldValue('published', false)
            }
          }}
        />
        {form.errors.scheduledAt && (
          <Input.Error>{form.errors.scheduledAt}</Input.Error>
        )}
      </Stack>

      <PrimaryButton
        loading={
          createOfficialBlog.isPending ||
          updateOfficialBlog.isPending ||
          uploadImages.isPending
        }
        size='md'
        type='submit'
      >
        {isEdit ? t('shared.buttons.update') : t('shared.buttons.add')}
      </PrimaryButton>
    </form>
  )
}

export default OfficialBlogForm
