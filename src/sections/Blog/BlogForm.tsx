import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Media, MediaTypes } from '@commonTypes'
import { DEFAULT_BLOG_FORM_DATA, navigationLinks } from '@constants'
import { BlogFormContext } from '@context'
import { PostTypes } from '@enums'
import {
  useCreateBlog,
  useLinkConstructor,
  useUpdateBlog,
  useUploadImages
} from '@hooks'
import { Stepper, Text } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import {
  BLOG_POST_FORM_SCHEMA_ADVANCED_INFORMATION,
  BLOG_POST_FORM_SCHEMA_BASIC_INFORMATION
} from '@schemas/community'
import Basic from '@sections/Blog/Steps/Basic'
import Details from '@sections/Blog/Steps/Details'
import { AddPostProps } from '@sections/Community/AddPost/AddPost'
import { BlogCardProps } from '@sections/Community/BlogsSection/BlogCard'
import { useTranslations } from 'next-intl'

import MultiSteps from '@components/MultiSteps'
import { FileItem } from '@components/UploadMultipleFiles'
import { appNotifications, cn, uploadImage } from '@utils'

const { useBlogForm, BlogFormProvider } = BlogFormContext

function BlogForm({
  blog,
  isEdit
}: Pick<AddPostProps, 'isEdit'> & BlogCardProps) {
  const t = useTranslations()
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const validations = [
    BLOG_POST_FORM_SCHEMA_BASIC_INFORMATION(t),
    BLOG_POST_FORM_SCHEMA_ADVANCED_INFORMATION(t)
  ]

  const currentValidation = validations[currentStep]

  const form = useBlogForm({
    initialValues: DEFAULT_BLOG_FORM_DATA,
    validate: zodResolver(currentValidation),
    mode: 'controlled'
  })

  useEffect(() => {
    if (isEdit && blog) {
      form.setValues(blog)
    }
  }, [blog, isEdit])

  const uploadImages = useUploadImages()
  const { constructLink } = useLinkConstructor()

  const createBlog = useCreateBlog({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.createdSuccessfully', {
          item: t('community.blog')
        })
      )
      router.push(
        constructLink(navigationLinks.community.allPosts, {
          type: PostTypes.Blog
        })
      )
    }
  })

  const updateBlog = useUpdateBlog({
    onSuccess: () => {
      appNotifications.success(
        t('successMessages.updatedSuccessfully', {
          item: t('community.blog')
        })
      )
      router.push(
        constructLink(navigationLinks.community.allPosts, {
          type: PostTypes.Blog
        })
      )
    }
  })

  const handleSubmit = async (
    data: Omit<typeof DEFAULT_BLOG_FORM_DATA, 'media'> & { media: FileItem[] }
  ) => {
    const media: Media[] = await Promise.all(
      data.media.map(async (image) => {
        let url = ''
        if (image.file.name.includes('storage.googleapis.com')) {
          return {
            url: image.file.name,
            type: image?.file?.type.includes(MediaTypes.Image)
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
          type: image?.file?.type.includes(MediaTypes.Image)
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

    if (isEdit && blog) {
      updateBlog.mutate({ id: blog._id, ...dataToSend })
    } else {
      createBlog.mutate(dataToSend)
    }
  }

  return (
    <BlogFormProvider form={form}>
      <form
        onSubmit={form.onSubmit((values) =>
          handleSubmit(values as typeof DEFAULT_BLOG_FORM_DATA)
        )}
      >
        <MultiSteps
          background='bg-primary-gradient'
          active={currentStep}
          onStepClick={setCurrentStep}
        >
          <Stepper.Step
            icon={
              <Image
                src={navigationLinks.assets.goldenCircle}
                alt='circle'
                width={15}
                height={15}
              />
            }
            label={
              <Text
                className={cn(
                  currentStep === 0 && 'text-sm font-bold md:text-md'
                )}
              >
                {t('community.blogPostForm.steps.basic')}
              </Text>
            }
          >
            <Basic
              onNext={() => {
                form.validate()
                if (form.isValid()) {
                  setCurrentStep(currentStep + 1)
                }
              }}
            />
          </Stepper.Step>
          <Stepper.Step
            icon={
              currentStep === 1 ? (
                <Image
                  src={navigationLinks.assets.goldenCircle}
                  alt='circle'
                  width={15}
                  height={15}
                />
              ) : (
                <div>&nbsp;</div>
              )
            }
            label={
              <Text
                className={cn(
                  currentStep === 1 && 'text-sm font-bold md:text-md'
                )}
              >
                {t('community.blogPostForm.steps.details')}
              </Text>
            }
          >
            <Details
              loading={
                createBlog.isPending ||
                uploadImages.isPending ||
                updateBlog.isPending
              }
              onBack={() => setCurrentStep(0)}
            />
          </Stepper.Step>
        </MultiSteps>
      </form>
    </BlogFormProvider>
  )
}

export default BlogForm
